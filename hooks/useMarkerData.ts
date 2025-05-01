import { DEFAULT_AMENITIES, fetchMarkerDataOrdered, RECYCLING_KEYS } from "@/services/osmService";
import { Marker } from "@/types/Marker";
import { useState, useEffect } from "react";

export function useMarkerData(lat: number | undefined, lon: number | undefined) {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      if (!lat || !lon) return;
  
      async function getMarkers() {
        if(!lat || !lon) return
        setLoading(true);
        const response = await fetchMarkerDataOrdered({
          lat,
          lon,
          amenities: DEFAULT_AMENITIES,
          recyclingFilters: RECYCLING_KEYS
        });

        setMarkers(response)
        setLoading(false)
      }
  
      getMarkers();
    }, [lat, lon]);
  
    return { markers, loading };
}