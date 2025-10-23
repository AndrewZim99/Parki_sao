// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Вспомогательная функция для валидации координат
export function isValidCoordinate(coord: any): coord is [number, number] {
    return (
        Array.isArray(coord) &&
        coord.length === 2 &&
        typeof coord[0] === 'number' &&
        typeof coord[1] === 'number' &&
        !isNaN(coord[0]) &&
        !isNaN(coord[1]) &&
        coord[0] >= -90 &&
        coord[0] <= 90 &&
        coord[1] >= -180 &&
        coord[1] <= 180
    );
}

// Функция для расчета центра полигона
export function calculatePolygonCenter(coordinates: [number, number][]): [number, number] {
    if (!coordinates || coordinates.length === 0) {
        return [55.751244, 37.618423]; // Москва по умолчанию
    }

    const sum = coordinates.reduce(
        (acc, coord) => {
            return [acc[0] + coord[0], acc[1] + coord[1]];
        },
        [0, 0]
    );

    return [sum[0] / coordinates.length, sum[1] / coordinates.length];
}

// Функция для получения границ области
export function getBounds(coordinates: [number, number][]): [[number, number], [number, number]] {
    if (!coordinates || coordinates.length === 0) {
        return [
            [55.7, 37.5],
            [55.9, 37.7],
        ];
    }

    const lats = coordinates.map((c) => c[0]);
    const lngs = coordinates.map((c) => c[1]);

    return [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
    ];
}

// Форматирование площади
export function formatArea(area: string | number): string {
    if (typeof area === 'number') {
        return `${area.toLocaleString('ru-RU')} м²`;
    }
    return area.includes('м²') ? area : `${area} м²`;
}

// Проверка наличия изображения
export function getImageUrl(path: string): string {
    if (!path) {
        return 'https://via.placeholder.com/200?text=Нет+изображения';
    }
    if (path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }
    return path;
}