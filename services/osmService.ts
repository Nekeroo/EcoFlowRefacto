import { Marker } from "@/types/Marker";
import axios from "axios";

export const DEFAULT_AMENITIES = [
  "recycling", // Point de recyclage général
  "waste_basket", // Corbeille publique
  "waste_disposal", // Centre de collecte des déchets
];

export const RECYCLING_KEYS = [
  "batteries",
  "books",
  "cans",
  "cartons",
  "cardboard",
  "clothes",
  "electrical_appliances",
  "glass_bottles",
  "green_waste",
  "magazines",
  "newspaper",
  "paper",
  "paper_packaging",
  "plastic",
  "plastic_bottles",
  "plastic_packaging",
  "scrap_metal",
  "small_appliances",
  "waste",
  "wood",
];

export async function fetchMarkerDataOrdered(params: {
  lat: number;
  lon: number;
  amenities: string[];
  recyclingFilters: string[];
}): Promise<Array<Map<number, Marker>>> {
  try {
    const response = await axios.post<Array<Map<number, Marker>>>(
      "https://ecoflow.mathieugr.fr/map/markers/order",
      params
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données Markers:", error);
    return [];
  }
}

export async function defineMarkerAdress(marker: Marker) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${marker.marker.lat}&lon=${marker.marker.lon}&format=json`;

  console.log(url);
  try {
    const response = await axios.get(url);

    const address = response.data.address?.road ?? "Adresse Inconnue";
    return address;
  } catch (error) {
    console.error('Error fetching address:', error);
    return "Adresse Inconnue";
  }
}
