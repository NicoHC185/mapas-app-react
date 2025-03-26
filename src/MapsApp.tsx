import { MapProvider, PlacesProvider } from "./contexts";
import { HomeScreen } from "./screens";

import "./styles.css";

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen></HomeScreen>
      </MapProvider>
    </PlacesProvider>
  );
};
