import axios from "axios";

// https://api.mapbox.com/directions/v5/mapbox/driving/-74.030721%2C40.767388%3B-74.030767%2C40.754422?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1Ijoibmljb2hjMTg1IiwiYSI6ImNtOHEyYzRlMDBnbTAyc3B1bmo4NjNqMTIifQ.agg9h18VmrQfE00joPSCWQ
const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: import.meta.env.VITE_MAPBOX_TOKEN
    }
})

export default directionsApi