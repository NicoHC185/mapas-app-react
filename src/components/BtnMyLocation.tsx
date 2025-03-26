import { useContext } from "react";
import { MapContext, PlacesContext } from "../contexts";

export const BtnMyLocation = () => {
  const { isMapReady, map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    console.log("click");
    if (!isMapReady) throw new Error("El mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion del usuario");

    console.log("click 2");
    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
      onClick={onClick}
    >
      Mi ubicación
    </button>
  );
};
