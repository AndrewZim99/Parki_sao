export interface Coordinates {
    lat: number;
    lng: number;
}

export interface District {
    name: string;
    coordinates: [number, number][];
}

export interface Park {
    name: string;
    district: string;
    address: string;
    area: string;
    sport: string;
    children: string;
    nto: string;
    toilets: string;
    children_room: string;
    geometry: {
        coordinates: [number, number][][][];
        type: string;
    };
}

export interface Facility {
    name: string;
    coords: [number, number];
    photo: string;
    description: string;
    area?: string;
    maf_count?: number;
    type_coverage?: string;
    id?: string;
    contract_action?: string;
    contract_with?: string;
    contract_term?: string;
}

export interface CategoryData {
    sports_playgrounds: Facility[];
    child_playgrounds: Facility[];
    nto: Facility[];
    toilets: Facility[];
    chill: Facility[];
    children_room: Facility[];
}

export type CategoryKey = keyof CategoryData;

export interface CategoryStyle {
    preset: string;
    name: string;
    color: string;
}