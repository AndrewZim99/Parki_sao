'use client';

import React from 'react';

interface ImageModalProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
}

export default function ImageModal({ isOpen, imageSrc, onClose }: ImageModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[10000] overflow-auto bg-black/90 flex items-center justify-center"
            onClick={onClose}
        >
      <span
          className="absolute top-4 right-4 text-white text-4xl font-bold cursor-pointer hover:text-gray-400"
          onClick={onClose}
      >
        &times;
      </span>
            <img
                src={imageSrc}
                alt="Увеличенное изображение"
                className="max-w-[90%] max-h-[80%] object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}