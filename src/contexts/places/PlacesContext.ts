import { createContext } from "react";

export interface PlaceContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
}

export const PlacesContext = createContext<PlaceContextProps>(
  {} as PlaceContextProps
);
