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
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                backgroundColor: 'white',
                padding: '10px',
                border: '2px solid #333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                maxWidth: '180px',
                zIndex: 10000,
                maxHeight: isCollapsed ? '60px' : '85vh',
                overflowY: isCollapsed ? 'hidden' : 'auto',
                transition: 'max-height 0.3s ease',
            }}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: isCollapsed ? '0' : '10px',
                }}
            >
                {isCollapsed ? '☰ Фильтры' : '✕ Свернуть'}
            </button>

            {!isCollapsed && (
                <div>
                    <button
                        onClick={onResetAll}
                        style={{
                            width: '100%',
                            margin: '5px 0',
                            padding: '8px',
                            fontSize: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: '#f87171',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Сбросить всё
                    </button>

                    {/* Районы */}
                    <div style={{ marginTop: '10px' }}>
                        <h3 style={{
                            margin: '8px 0',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            borderBottom: '2px solid #4CAF50',
                            paddingBottom: '4px'
                        }}>
                            Районы САО
                        </h3>
                        {districts.map((district) => (
                            <label key={district} style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '6px 0',
                                paddingLeft: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={selectedDistricts.includes(district)}
                                    onChange={() => onDistrictToggle(district)}
                                    style={{ marginRight: '6px', width: '16px', height: '16px', cursor: 'pointer' }}
                                />
                                <span>{district}</span>
                            </label>
                        ))}
                    </div>

                    {/* Категории */}
                    <div style={{ marginTop: '10px' }}>
                        <h3 style={{
                            margin: '8px 0',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            borderBottom: '2px solid #4CAF50',
                            paddingBottom: '4px'
                        }}>
                            Категории
                        </h3>
                        {categories.map(({ key, name }) => (
                            <label key={key} style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '6px 0',
                                paddingLeft: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(key)}
                                    onChange={() => onCategoryToggle(key)}
                                    style={{ marginRight: '6px', width: '16px', height: '16px', cursor: 'pointer' }}
                                />
                                <span>{name}</span>
                            </label>
                        ))}
                    </div>

                    {/* Парки */}
                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <h3 style={{
                            margin: '8px 0',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            borderBottom: '2px solid #4CAF50',
                            paddingBottom: '4px'
                        }}>
                            Парки САО
                        </h3>
                        {parks.map((park) => (
                            <label key={park} style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '6px 0',
                                paddingLeft: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={selectedParks.includes(park)}
                                    onChange={() => onParkToggle(park)}
                                    style={{ marginRight: '6px', width: '16px', height: '16px', cursor: 'pointer' }}
                                />
                                <span>{park}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}