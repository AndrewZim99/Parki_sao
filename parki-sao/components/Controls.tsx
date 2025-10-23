'use client';

import React, { useState } from 'react';
import { CategoryKey } from '@/types';

interface ControlsProps {
    districts: string[];
    parks: string[];
    categories: { key: CategoryKey; name: string }[];
    selectedDistricts: string[];
    selectedParks: string[];
    selectedCategories: CategoryKey[];
    onDistrictToggle: (district: string) => void;
    onParkToggle: (park: string) => void;
    onCategoryToggle: (category: CategoryKey) => void;
    onResetAll: () => void;
}

export default function Controls({
                                     districts,
                                     parks,
                                     categories,
                                     selectedDistricts,
                                     selectedParks,
                                     selectedCategories,
                                     onDistrictToggle,
                                     onParkToggle,
                                     onCategoryToggle,
                                     onResetAll,
                                 }: ControlsProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div
            className={`fixed top-2 right-2 bg-white/95 p-2 z-[1000] border border-gray-300 rounded-lg shadow-lg max-w-[160px] transition-all ${
                isCollapsed ? 'max-h-[40px] overflow-hidden' : 'max-h-[80vh] overflow-y-auto'
            }`}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full px-2 py-2 bg-gray-200 border-none rounded cursor-pointer text-center text-sm mb-2 hover:bg-gray-300"
            >
                {isCollapsed ? 'Развернуть панель' : 'Свернуть панель'}
            </button>

            {!isCollapsed && (
                <>
                    <button
                        onClick={onResetAll}
                        className="w-full my-1 block px-2 py-2 text-sm border border-gray-300 rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
                    >
                        Сбросить все выборки
                    </button>

                    {/* Районы */}
                    <div className="mt-2">
                        <h3 className="my-2 text-sm font-bold text-gray-800 border-b border-gray-300 pb-1">
                            Районы САО
                        </h3>
                        {districts.map((district) => (
                            <label key={district} className="flex items-center my-1 pl-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedDistricts.includes(district)}
                                    onChange={() => onDistrictToggle(district)}
                                    className="mr-2 w-4 h-4"
                                />
                                {district}
                            </label>
                        ))}
                    </div>

                    {/* Категории */}
                    <div className="mt-2">
                        <h3 className="my-2 text-sm font-bold text-gray-800 border-b border-gray-300 pb-1">
                            Категории
                        </h3>
                        {categories.map(({ key, name }) => (
                            <label key={key} className="flex items-center my-1 pl-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(key)}
                                    onChange={() => onCategoryToggle(key)}
                                    className="mr-2 w-4 h-4"
                                />
                                {name}
                            </label>
                        ))}
                    </div>

                    {/* Парки */}
                    <div className="mt-2">
                        <h3 className="my-2 text-sm font-bold text-gray-800 border-b border-gray-300 pb-1">
                            Парки САО
                        </h3>
                        {parks.map((park) => (
                            <label key={park} className="flex items-center my-1 pl-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedParks.includes(park)}
                                    onChange={() => onParkToggle(park)}
                                    className="mr-2 w-4 h-4"
                                />
                                {park}
                            </label>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}