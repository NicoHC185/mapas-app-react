export interface PlaceResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text:                 string;
    place_name:           string;
    bbox?:                number[];
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    id:          string;
    mapbox_id:   string;
    wikidata?:   string;
    short_code?: ShortCode;
    text:        string;
}

export enum ShortCode {
    Cl = "cl",
    ClCo = "CL-CO",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    mapbox_id?: string;
    wikidata?:  string;
    accuracy?:  string;
}
