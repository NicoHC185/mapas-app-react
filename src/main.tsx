import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MapsApp } from "./MapsApp.tsx";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opción de geolocation");
  throw new Error("Tu navegador no tiene opción de geolocation");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>
);
