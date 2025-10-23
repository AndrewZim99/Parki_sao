// data/parks.ts
import { Park } from '@/types';

// @ts-ignore
export const parks: Park[] = [
    {
        name: "Парк между Ленинградским шоссе и каналом им. Москвы",
        district: "Левобережный",
        address: "Район Левобережный",
        area: "129889,83",
        sport: "3",
        children: "1",
        nto: "0",
        toilets: "2",
        children_room: "1",
        geometry: {
            coordinates: [[[
                [55.87951, 37.45639] as [number, number],
                [55.87767, 37.45098] as [number, number],
                [55.87413, 37.4548] as [number, number],
                [55.87503, 37.45576] as [number, number],
                [55.87778, 37.45666] as [number, number],
                [55.87903, 37.45696] as [number, number],
                [55.87951, 37.45639] as [number, number]
            ]]],
            type: "MultiPolygon"
        }
    },
    {
        name: "Базовский сквер",
        district: "Западное Дегунино",
        address: "Район Западное Дегунино",
        area: "54556,16",
        sport: "7",
        children: "9",
        nto: "0",
        toilets: "0",
        children_room: "0",
        geometry: {
            coordinates: [[[
                [55.87561, 37.50488] as [number, number],
                [55.87437, 37.50625] as [number, number],
                [55.87433, 37.50649] as [number, number],
                [55.87454, 37.50698] as [number, number],
                [55.8776, 37.5109] as [number, number],
                [55.8777, 37.50932] as [number, number],
                [55.87735, 37.50846] as [number, number],
                [55.87764, 37.5077] as [number, number],
                [55.87561, 37.50488] as [number, number]
            ]]],
            type: "MultiPolygon"
        }
    },
    // Добавьте остальные парки из вашего park_sao
];