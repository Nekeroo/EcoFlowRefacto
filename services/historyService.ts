import { WasteInfo } from '@/types/WasteInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type HistoryItem = {
  id: string
  timestamp: number
  imageUri: string
  wasteInfo: WasteInfo
}

const HISTORY_STORAGE_KEY = 'ecoflow_history'

export const saveToHistory = async (imageUri: string, wasteInfo: WasteInfo): Promise<void> => {
  try {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageUri,
      wasteInfo
    }
    
    const existingHistory = await getHistory()
    const updatedHistory = [historyItem, ...existingHistory]
    
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_STORAGE_KEY)
    if (!historyJson) return []
    
    return JSON.parse(historyJson) as HistoryItem[]
  } catch (error) {
    console.error('Error getting history:', error)
    return []
  }
}

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}

export const deleteHistoryItem = async (id: string): Promise<void> => {
  try {
    const history = await getHistory()
    const updatedHistory = history.filter(item => item.id !== id)
    
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Error deleting history item:', error)
  }
}
