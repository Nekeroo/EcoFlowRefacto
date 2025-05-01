export type Marker = {
  distance: number;
  marker: MarkerInfo;
};

export type MarkerInfo = {
  id: number;
  lat: number;
  lon: number;
  name?: string;
  tags: TagObjet; 
  address?: string;
} 

export type TagObjet = {
  amenity?: string;
  name?: string;
  recycling_type?: string;
}