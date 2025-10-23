'use client';

import React, { useState } from 'react';
import { YMaps, Map, Polygon, Placemark } from '@pbe/react-yandex-maps';
import { Park, Facility, CategoryKey } from '@/types';

interface MapComponentProps {
    parks: Park[];
    facilities: Record<CategoryKey, Facility[]>;
    selectedDistricts: string[];
    selectedCategories: CategoryKey[];
    selectedParks: string[];
    districtCoordinates: Record<string, [number, number][]>;
    onPlacemarkClick: (facility: Facility) => void;
}

const categoryStyles: Record<CategoryKey, { preset: string; color: string }> = {
    sports_playgrounds: { preset: 'islands#greenCircleDotIcon', color: '#00ff00' },
    child_playgrounds: { preset: 'islands#redCircleDotIcon', color: '#ff0000' },
    nto: { preset: 'islands#blueCircleDotIcon', color: '#0000ff' },
    toilets: { preset: 'islands#grayCircleDotIcon', color: '#808080' },
    chill: { preset: 'islands#yellowCircleDotIcon', color: '#ffff00' },
    children_room: { preset: 'islands#grayCircleDotIcon', color: '#a9a9a9' },
};

export default function MapComponent({
                                         parks,
                                         facilities,
                                         selectedDistricts,
                                         selectedCategories,
                                         selectedParks,
                                         districtCoordinates,
                                         onPlacemarkClick,
                                     }: MapComponentProps) {
    const [mapState] = useState({
        center: [55.821, 37.565] as [number, number],
        zoom: 14,
    });

    const createBalloonContent = (facility: Facility, category: CategoryKey): string => {
        let content = `<div style="max-width: 300px;">
      <img src="${facility.photo}" style="width: 100%; max-width: 200px; height: auto;" onerror="this.src='https://via.placeholder.com/200'" />
      <h3>${facility.name || 'Без названия'}</h3>
      <p><strong>Категория:</strong> ${getCategoryName(category)}</p>`;

        if (category === 'sports_playgrounds' || category === 'child_playgrounds') {
            content += `
        <p><strong>Площадь:</strong> ${facility.area || ''}</p>
        <p><strong>Кол-во МАФ:</strong> ${facility.maf_count || ''}</p>
        <p><strong>Тип покрытия:</strong> ${facility.type_coverage || ''}</p>
        <p><strong>ID:</strong> ${facility.id || ''}</p>`;
        } else if (category === 'nto') {
            content += `
        <p><strong>С кем контракт:</strong> ${facility.contract_with || ''}</p>
        <p><strong>Срок контракта:</strong> ${facility.contract_term || ''}</p>
        <p><strong>Специализация:</strong> ${facility.description || ''}</p>`;
        } else if (category === 'toilets' || category === 'children_room') {
            content += `<p><strong>Площадь:</strong> ${facility.area || ''}</p>`;
        } else if (category === 'chill') {
            content += `
        <p><strong>Площадь:</strong> ${facility.area || ''}</p>
        <p><strong>Кол-во МАФ:</strong> ${facility.maf_count || ''}</p>
        <p><strong>Тип покрытия:</strong> ${facility.type_coverage || ''}</p>`;
        }

        content += '</div>';
        return content;
    };

    const getCategoryName = (category: CategoryKey): string => {
        const names: Record<CategoryKey, string> = {
            sports_playgrounds: 'Спортивные площадки',
            child_playgrounds: 'Детские площадки',
            nto: 'НТО',
            toilets: 'Туалеты',
            chill: 'Зоны отдыха',
            children_room: 'Комната матери и ребенка',
        };
        return names[category];
    };

    return (
        <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY || '', lang: 'ru_RU' }}>
            <Map
                state={mapState}
                width="100%"
                height="100vh"
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            >
                {/* Районы */}
                {selectedDistricts.map((districtName) => {
                    const coords = districtCoordinates[districtName];
                    if (!coords) return null;

                    return (
                        <Polygon
                            key={`district-${districtName}`}
                            geometry={[coords]}
                            options={{
                                fillColor: 'rgba(0, 0, 0, 0)',
                                strokeColor: '#FF0000',
                                strokeWidth: 3,
                                strokeStyle: 'dash',
                                opacity: 0.7,
                            }}
                            properties={{
                                hintContent: districtName,
                            }}
                        />
                    );
                })}

                {/* Парки */}
                {selectedParks.map((parkName) => {
                    const park = parks.find((p) => p.name === parkName);
                    if (!park || !park.geometry.coordinates[0][0]) return null;

                    return (
                        <Polygon
                            key={`park-${parkName}`}
                            geometry={[park.geometry.coordinates[0][0]]}
                            options={{
                                fillColor: 'rgba(0, 255, 0, 0.5)',
                                strokeColor: '#008000',
                                strokeWidth: 2,
                                opacity: 0.7,
                            }}
                            properties={{
                                hintContent: park.name,
                                balloonContent: `
                  <div>
                    <h3>${park.name}</h3>
                    <p><strong>Район:</strong> ${park.district}</p>
                    <p><strong>Площадь:</strong> ${park.area} м²</p>
                    <p><strong>Спортивных площадок:</strong> ${park.sport}</p>
                    <p><strong>Детских площадок:</strong> ${park.children}</p>
                    <p><strong>НТО:</strong> ${park.nto}</p>
                    <p><strong>Туалетов:</strong> ${park.toilets}</p>
                  </div>
                `,
                            }}
                        />
                    );
                })}

                {/* Объекты (площадки, туалеты и т.д.) */}
                {selectedCategories.map((category) => {
                    return facilities[category]?.map((facility, index) => {
                        if (!facility.coords || facility.coords.length !== 2) return null;

                        return (
                            <Placemark
                                key={`${category}-${index}`}
                                geometry={facility.coords}
                                options={{
                                    preset: categoryStyles[category].preset,
                                    visible: true,
                                }}
                                properties={{
                                    hintContent: facility.name || 'Без названия',
                                    balloonContent: createBalloonContent(facility, category),
                                }}
                                onClick={() => onPlacemarkClick(facility)}
                            />
                        );
                    });
                })}
            </Map>
        </YMaps>
    );
}