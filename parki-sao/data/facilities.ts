// data/facilities.ts
import { CategoryData } from '@/types';

export const facilities: CategoryData = {
    sports_playgrounds: [
        {
            name: "Спортивная площадка со спорт инвентарем",
            coords: [55.818712, 37.565567],
            photo: "/images/dubki/trenazherka.jpg",
            description: "Спортивная площадка со спорт инвентарем",
            area: "207,72 м²",
            maf_count: 17,
            type_coverage: "Резиновая крошка",
            id: "1180559779"
        },
        // Добавьте остальные объекты из вашего district_data
    ],
    child_playgrounds: [
        {
            name: "Детская площадка 1",
            coords: [55.820202, 37.567296],
            photo: "/images/dubki/detskaya-1.jpg",
            description: "Детская площадка",
            area: "239,92 м²",
            maf_count: 7,
            type_coverage: "Резиновая крошка",
            id: "1180559777"
        },
        // Добавьте остальные
    ],
    nto: [
        {
            name: "Трдельник",
            coords: [55.821824, 37.565890],
            photo: "/images/dubki/trdelnik.png",
            description: "Горячие напитки/Выпечка",
            contract_action: "Аренда",
            contract_with: "ООО ПРЕТИСА",
            contract_term: "с 05.10.2024 до 01.11.2025"
        },
        // Добавьте остальные
    ],
    toilets: [
        {
            name: "Туалет 1",
            coords: [55.819712, 37.564463],
            photo: "/images/dubki/tualet-1.jpeg",
            description: "Общественный туалет",
            area: "50 м²",
            id: "11"
        },
        // Добавьте остальные
    ],
    chill: [
        {
            name: "Качели",
            coords: [55.821483, 37.563402],
            photo: "/images/dubki/kacheli.jpg",
            description: "Детская площадка",
            area: "500 м²",
            maf_count: 10,
            type_coverage: "Бетонное покрытие",
            id: "1111"
        },
    ],
    children_room: [
        {
            name: "Комната Матери и ребенка",
            coords: [55.822723, 37.565091],
            photo: "/images/dubki/materi-i-rebenka.jpg",
            description: "Детская площадка",
            area: "15 м²",
            maf_count: 10,
            type_coverage: "Бетонное покрытие",
            id: "1111"
        },
    ],
};