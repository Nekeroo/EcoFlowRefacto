export type WasteInfo = {
    identification: {
      nom: string
      matériau: string
      catégorie: string
    }
    tri: {
      poubelle: string
      instructions: string
      pourquoi: string
    }
    impact: {
      temps_decomposition: string
      toxicité: string
      émissions_CO2: string
    }
    réglementation: {
      collecte_spéciale: boolean
      notes: string
    }
    conseils: string[]
    erreur?: {
      présent: boolean
      message: string
      type: 'parsing' | 'api' | 'autre'
    }
}