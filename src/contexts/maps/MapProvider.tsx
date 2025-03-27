import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { JSX, useContext, useEffect, useReducer } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionApi } from "../../apis";
import { DirectionResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
};

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []
    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`
        <h4>${place.text}</h4>
        <p>${place.place_name}</p>
        `)
      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)
      newMarkers.push(newMarker)
    }
    dispatch({ type: 'setMarkers', payload: newMarkers })
    //eslint-disable-next-line
  }, [places])

  const getRouterBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionApi.get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`)
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry
    const kms = Math.round((distance / 1000))
    const minutes = Math.floor(duration / 60)
    console.log(kms, minutes)

    const bounds = new LngLatBounds(start, start)
    for (const coord of coords) {
      const [lng, lat] = coord
      bounds.extend([lng, lat])
    }
    state.map?.fitBounds(bounds, {
      padding: 200
    })

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Limpiar ruta
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData)
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  }


  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
        <h4>Aquí estoy</h4>
        <p>En algún lugar del mundo</p>
      `);

    new Marker()
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  return (
    <MapContext.Provider value={{
      ...state, setMap,
      getRouterBetweenPoints
    }}>
      {children}
    </MapContext.Provider>
  );
};
