import { createContext } from "react";
import { Feature } from "../../interfaces/places";


export interface PlaceContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[]

  // Methods
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlaceContextProps>(
  {} as PlaceContextProps
);
