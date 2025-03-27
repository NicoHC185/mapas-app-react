import { Map } from "mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getRouterBetweenPoints: (start: [number, number], end: [number, number]) => void;
}

export const MapContext = createContext({} as MapContextProps);
