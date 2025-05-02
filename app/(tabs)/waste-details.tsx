import React from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView, BackHandler } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { WasteInfo } from '@/types/WasteInfo'


export default function WasteDetailsScreen() {
  const params = useLocalSearchParams()
  const wasteInfo = global.wasteInfo as WasteInfo

  if (!wasteInfo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.noResultsContainer}>
            <ThemedText style={styles.noResultsText}>Aucune information disponible</ThemedText>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <AntDesign name="home" size={20} color="white" />
              <ThemedText style={styles.backButtonText}>Retour à l'accueil</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    )
  }
  
  // Vérifier si une erreur est présente
  if (wasteInfo.erreur?.présent) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.errorContainer}>
            <AntDesign name="exclamationcircleo" size={50} color="#E53935" />
            <ThemedText style={styles.errorTitle}>
              {wasteInfo.erreur.type === 'parsing' ? 'Erreur d\'analyse' : 
               wasteInfo.erreur.type === 'api' ? 'Erreur de l\'API' : 'Erreur inattendue'}
            </ThemedText>
            <ThemedText style={styles.errorMessage}>{wasteInfo.erreur.message}</ThemedText>
            <ThemedText style={styles.errorDescription}>
              Nous n'avons pas pu analyser correctement l'image de déchet. Veuillez réessayer avec une photo plus claire ou un autre déchet.
            </ThemedText>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <AntDesign name="reload1" size={20} color="white" />
              <ThemedText style={styles.backButtonText}>Réessayer</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    )
  }

  const getBinColorForDisplay = (poubelle: string) => {
    const colorMap: Record<string, string> = {
      'jaune': '#FFC107',
      'verte': '#4CAF50',
      'bleue': '#2196F3',
      'grise': '#9E9E9E',
      'noire': '#000000',
      'marron': '#795548'
    }
    
    for (const [color, hex] of Object.entries(colorMap)) {
      if (poubelle.toLowerCase().includes(color)) {
        return hex
      }
    }
    
    return '#9E9E9E'
  }
  
  const goToHome = () => {
    router.dismissAll()
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
          title={wasteInfo.identification.nom}
          actions={
            <View style={styles.appBarActions}>
              <TouchableOpacity onPress={goToHome}>
                <AntDesign name="home" size={22} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          }
        
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.header}>
            <View style={styles.wasteBadge}>
              <AntDesign name="form" size={22} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.title}>{wasteInfo.identification.nom}</ThemedText>
            <View style={styles.materialBadges}>
              <View style={styles.materialBadge}>
                <ThemedText style={styles.materialText}>{wasteInfo.identification.matériau}</ThemedText>
              </View>
              <View style={styles.categoryBadge}>
                <ThemedText style={styles.categoryText}>{wasteInfo.identification.catégorie}</ThemedText>
              </View>
            </View>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <AntDesign name="swap" size={20} color="#4CAF50" />
              <ThemedText type="subtitle" style={styles.sectionTitle}>Instructions de tri</ThemedText>
            </View>
            
            <View style={styles.binContainer}>
              <View style={[styles.binCard, { borderLeftColor: getBinColorForDisplay(wasteInfo.tri.poubelle) }]}>
                <View style={styles.binCardContent}>
                  <View style={[styles.binColorIndicator, { backgroundColor: getBinColorForDisplay(wasteInfo.tri.poubelle) }]} />
                  <ThemedText style={styles.binTitle}>Poubelle {wasteInfo.tri.poubelle}</ThemedText>
                </View>
                <ThemedText style={styles.instructionText}>{wasteInfo.tri.instructions}</ThemedText>
                <View style={styles.whyContainer}>
                  <ThemedText style={styles.whyTitle}>Pourquoi ?</ThemedText>
                  <ThemedText style={styles.whyText}>{wasteInfo.tri.pourquoi}</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <AntDesign name="earth" size={20} color="#4CAF50" />
              <ThemedText type="subtitle" style={styles.sectionTitle}>Impact environnemental</ThemedText>
            </View>
            
            <View style={styles.impactCardsContainer}>
              <View style={styles.impactCard}>
                <AntDesign name="clockcircleo" size={26} color="#4CAF50" />
                <ThemedText style={styles.impactLabel}>Décomposition</ThemedText>
                <ThemedText style={styles.impactValue}>{wasteInfo.impact.temps_decomposition}</ThemedText>
              </View>
              
              <View style={styles.impactCard}>
                <AntDesign name="warning" size={26} color="#FFA000" />
                <ThemedText style={styles.impactLabel}>Toxicité</ThemedText>
                <ThemedText style={styles.impactValue}>{wasteInfo.impact.toxicité}</ThemedText>
              </View>
              
              <View style={styles.impactCard}>
                <AntDesign name="cloudo" size={26} color="#607D8B" />
                <ThemedText style={styles.impactLabel}>Émissions CO2</ThemedText>
                <ThemedText style={styles.impactValue}>{wasteInfo.impact.émissions_CO2}</ThemedText>
              </View>
            </View>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <AntDesign name="Safety" size={20} color="#4CAF50" />
              <ThemedText type="subtitle" style={styles.sectionTitle}>Réglementation</ThemedText>
            </View>
            
            <View style={styles.regulationContainer}>
              <View style={styles.collectionBadge}>
                <ThemedText style={styles.collectionText}>
                  {wasteInfo.réglementation.collecte_spéciale ? <ThemedText>Collecte spéciale requise</ThemedText> : <ThemedText>Collecte standard</ThemedText>}
                </ThemedText>
              </View>
              
              {wasteInfo.réglementation.collecte_spéciale && (
                <View style={styles.notesContainer}>
                  <ThemedText style={styles.notesText}>{wasteInfo.réglementation.notes}</ThemedText>
                </View>
              )}
            </View>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <AntDesign name="bulb1" size={20} color="#4CAF50" />
              <ThemedText type="subtitle" style={styles.sectionTitle}>Conseils pratiques</ThemedText>
            </View>
            
            <View style={styles.tipsContainer}>
              {wasteInfo.conseils.map((conseil, index) => (
                <View key={index} style={styles.tipContainer}>
                  <AntDesign name="checkcircleo" size={16} color="#4CAF50" style={styles.tipIcon} />
                  <ThemedText style={styles.tipText}>{conseil}</ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>
          
          <View style={styles.bottomPadding} />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9F9'
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 20,
    marginBottom: 10
  },
  errorMessage: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center'
  },
  errorDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FFF9'
  },
  noResultsText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
    fontWeight: '500'
  },
  scrollView: {
    flex: 1,
    marginTop: 10
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#F9FFF9',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  wasteBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333'
  },
  materialBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  materialBadge: {
    backgroundColor: '#E0F2F1',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8
  },
  materialText: {
    color: '#00897B',
    fontSize: 14
  },
  categoryBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  categoryText: {
    color: '#43A047',
    fontSize: 14
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    elevation: 1,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  binContainer: {
    marginTop: 4
  },
  binCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 8
  },
  binCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  binColorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  binTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20
  },
  whyContainer: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8
  },
  whyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#555'
  },
  whyText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18
  },
  impactCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  impactCard: {
    backgroundColor: '#F9FFF9',
    borderRadius: 10,
    padding: 12,
    width: '31%',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9'
  },
  impactLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center'
  },
  impactValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center'
  },
  regulationContainer: {
    alignItems: 'flex-start'
  },
  collectionBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 12
  },
  collectionText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  notesContainer: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    width: '100%'
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  tipsContainer: {
    marginTop: 4
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  tipIcon: {
    marginTop: 2,
    marginRight: 8
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    flex: 1
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 14
  },
  infoBlock: {
    marginBottom: 10
  },
  binRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  appBarButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  bottomPadding: {
    height: 30
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  }
})