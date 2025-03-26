import { JSX, useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";
import { Feature, PlaceResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
};

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) return []
    if (!state.userLocation) throw new Error('No hay ubicación del usuario')

    dispatch({ type: 'setLoadingPlaces' })
    const resp = await searchApi.get<PlaceResponse>(`${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })
    dispatch({ type: 'setPlaces', payload: resp.data.features })
    return resp.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
