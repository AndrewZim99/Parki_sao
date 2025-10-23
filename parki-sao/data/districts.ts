// data/districts.ts
import { District } from '@/types';

export const districts: Record<string, [number, number][]> = {
    "Аэропорт": [
        [55.80608, 37.51101], [55.80647, 37.51137], [55.80803, 37.51279],
        // ... добавьте все координаты из вашего JSON
        [55.80608, 37.51101]
    ],
    "Беговой": [
        [55.78496, 37.54084], [55.78541, 37.54188],
        // ... остальные координаты
    ],
    // Добавьте остальные районы
};

export const getDistrictNames = (): string[] => {
    return Object.keys(districts);
};

export const getDistrictCoordinates = (name: string): [number, number][] => {
    return districts[name] || [];
};