import { WasteInfo } from '@/types/WasteInfo'
import Constants from 'expo-constants'
import * as FileSystem from 'expo-file-system'
import OpenAI from 'openai'


const MODEL = 'gpt-4o'

export const analyzeWasteImage = async (imageUri: string): Promise<WasteInfo> => {
  try {
    const base64Image = await convertImageToBase64(imageUri)
    const response = await sendImageToOpenAI(base64Image)
    return parseOpenAIResponse(response)
  } catch (error) {
    console.error('Error analyzing waste with OpenAI:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
    const errorType = errorMessage.includes('parse') ? 'parsing' : errorMessage.includes('API') ? 'api' : 'autre'
    const wasteInfo = getDefaultWasteInfo()
    wasteInfo.erreur = {
      présent: true,
      message: errorMessage,
      type: errorType
    }
    return wasteInfo
  }
}

const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64
    })
    return base64
  } catch (error) {
    console.error('Error converting image to base64:', error)
    throw error
  }
}

const sendImageToOpenAI = async (base64Image: string): Promise<any> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY
    console.log(apiKey)
    if (!apiKey) {
      throw new Error('OpenAI API key is not defined')
    }

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    })

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyse cette image de déchet et fournit les informations suivantes UNIQUEMENT au format JSON exact spécifié ci-dessous. N'ajoute aucun texte avant ou après la réponse JSON.\n\n{\n  \"identification\": {\n    \"nom\": \"nom du déchet\"\n    \"matériau\": \"matériau principal\"\n    \"catégorie\": \"organique/plastique/verre/papier/métal/électronique/autre\"\n  }\n  \"tri\": {\n    \"poubelle\": \"couleur ou type de poubelle recommandée\"\n    \"instructions\": \"instruction spécifique de tri si nécessaire\"\n    \"pourquoi\": \"explication courte\"\n  }\n  \"impact\": {\n    \"temps_decomposition\": \"durée en années/mois\"\n    \"toxicité\": \"faible/moyenne/haute\"\n    \"émissions_CO2\": \"estimation\"\n  }\n  \"réglementation\": {\n    \"collecte_spéciale\": true/false\n    \"notes\": \"information sur collecte spécifique si applicable\"\n  }\n  \"conseils\": [\"suggestions pour réduire/réutiliser ce type de déchet\"]\n}"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0.2
    })

    return response
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw error
  }
}

const parseOpenAIResponse = (response: any): WasteInfo => {
  try {
    const content = response.choices[0].message.content
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0]
      const wasteInfo = JSON.parse(jsonStr)
      
      return {
        identification: {
          nom: wasteInfo.identification?.nom || 'Déchet non identifié',
          matériau: wasteInfo.identification?.matériau || 'Matériau inconnu',
          catégorie: wasteInfo.identification?.catégorie || 'Autre'
        },
        tri: {
          poubelle: wasteInfo.tri?.poubelle || 'Non spécifié',
          instructions: wasteInfo.tri?.instructions || 'Aucune instruction spécifique',
          pourquoi: wasteInfo.tri?.pourquoi || 'Information non disponible'
        },
        impact: {
          temps_decomposition: wasteInfo.impact?.temps_decomposition || 'Inconnu',
          toxicité: wasteInfo.impact?.toxicité || 'Non évaluée',
          émissions_CO2: wasteInfo.impact?.émissions_CO2 || 'Non quantifiées'
        },
        réglementation: {
          collecte_spéciale: Boolean(wasteInfo.réglementation?.collecte_spéciale),
          notes: wasteInfo.réglementation?.notes || 'Aucune note spécifique'
        },
        conseils: Array.isArray(wasteInfo.conseils) ? wasteInfo.conseils : ['Aucun conseil disponible'],
        erreur: {
          présent: false,
          message: '',
          type: 'autre'
        }
      }
    }
    
    throw new Error('Impossible de parser le JSON de la réponse OpenAI')
  } catch (error) {
    console.error('Error parsing OpenAI response:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue lors du parsing'
    const wasteInfo = getDefaultWasteInfo()
    wasteInfo.erreur = {
      présent: true,
      message: errorMessage,
      type: 'parsing'
    }
    return wasteInfo
  }
}

const getDefaultWasteInfo = (): WasteInfo => {
  return {
    identification: {
      nom: 'Déchet non identifié',
      matériau: 'Matériau inconnu',
      catégorie: 'Autre'
    },
    tri: {
      poubelle: 'Non spécifié',
      instructions: 'Consultez les directives locales de gestion des déchets',
      pourquoi: 'Information non disponible'
    },
    impact: {
      temps_decomposition: 'Inconnu',
      toxicité: 'Non évaluée',
      émissions_CO2: 'Non quantifiées'
    },
    réglementation: {
      collecte_spéciale: false,
      notes: 'Consultez les règlements locaux'
    },
    conseils: ['Réduisez, réutilisez, recyclez quand c\'est possible'],
    erreur: {
      présent: false,
      message: '',
      type: 'autre'
    }
  }
}
