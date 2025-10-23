'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Controls from '@/components/Controls';
import ImageModal from '@/components/ImageModal';
import { CategoryKey, Facility } from '@/types';
import { districts } from '@/data/districts';
import { parks } from '@/data/parks';
import { facilities } from '@/data/facilities';

// Динамический импорт для избежания SSR проблем с Yandex Maps
const MapComponent = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Загрузка карты...</div>,
});

const categories: { key: CategoryKey; name: string }[] = [
    { key: 'sports_playgrounds', name: 'Спортивные площадки' },
    { key: 'child_playgrounds', name: 'Детские площадки' },
    { key: 'nto', name: 'НТО' },
    { key: 'toilets', name: 'Туалеты' },
    { key: 'chill', name: 'Зоны отдыха' },
    { key: 'children_room', name: 'Комната матери и ребенка' },
];

export default function Home() {
    const districtNames = Object.keys(districts);
    const parkNames = parks.map((p) => p.name);

    const [selectedDistricts, setSelectedDistricts] = useState<string[]>(districtNames);
    const [selectedParks, setSelectedParks] = useState<string[]>(parkNames);
    const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(
        categories.map((c) => c.key)
    );
    const [modalImage, setModalImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDistrictToggle = (district: string) => {
        setSelectedDistricts((prev) =>
            prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
        );
    };

    const handleParkToggle = (park: string) => {
        setSelectedParks((prev) =>
            prev.includes(park) ? prev.filter((p) => p !== park) : [...prev, park]
        );
    };

    const handleCategoryToggle = (category: CategoryKey) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleResetAll = () => {
        setSelectedDistricts([]);
        setSelectedParks([]);
        setSelectedCategories([]);
    };

    const handlePlacemarkClick = (facility: Facility) => {
        if (facility.photo) {
            setModalImage(facility.photo);
            setIsModalOpen(true);
        }
    };

    return (
        <main className="relative w-full h-screen overflow-hidden">
            <MapComponent
                parks={parks}
                facilities={facilities}
                selectedDistricts={selectedDistricts}
                selectedCategories={selectedCategories}
                selectedParks={selectedParks}
                districtCoordinates={districts}
                onPlacemarkClick={handlePlacemarkClick}
            />

            <Controls
                districts={districtNames}
                parks={parkNames}
                categories={categories}
                selectedDistricts={selectedDistricts}
                selectedParks={selectedParks}
                selectedCategories={selectedCategories}
                onDistrictToggle={handleDistrictToggle}
                onParkToggle={handleParkToggle}
                onCategoryToggle={handleCategoryToggle}
                onResetAll={handleResetAll}
            />

            <ImageModal
                isOpen={isModalOpen}
                imageSrc={modalImage}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}