import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../contexts"
import { LoadingPlaces } from "./LoadingPlaces"
import { Feature } from "../interfaces/places"

export const SearchResult = () => {

    const { userLocation, places, isLoadingPlaces } = useContext(PlacesContext)
    const { map, getRouterBetweenPoints } = useContext(MapContext)

    const [activeId, setActiveId] = useState('')


    const onPlaceClick = (place: Feature) => {
        setActiveId(place.id)
        const [lng, lat] = place.center
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        if (!userLocation) return
        const [lng, lat] = place.center
        getRouterBetweenPoints(userLocation, [lng, lat])
    }

    if (isLoadingPlaces) return <LoadingPlaces />

    if (places.length === 0) return <></>

    return (
        <ul className="list-group mt-3" style={{
            maxHeight: '80vh',
            overflowY: 'scroll'
        }}>
            {
                places.map(place =>
                    <li
                        key={place.id} className={`list-group-item list-group-item-action pointer ${activeId === place.id ? 'active' : ''}`}
                        onClick={() => onPlaceClick(place)}
                    >
                        <h6>
                            {place.text}
                        </h6>
                        <p className={`${activeId !== place.id ? 'text-muted' : ''}`} style={{ fontSize: '12px' }}>
                            {place.place_name}
                        </p>
                        <button onClick={() => getRoute(place)} className={`btn ${activeId !== place.id ? 'btn-outline-primary' : 'btn-outline-light'} btn-sm`}>Direcciones</button>
                    </li >
                )
            }
        </ul >
    )
}
