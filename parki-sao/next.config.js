/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['via.placeholder.com'],
    },
    // Отключаем strict mode для Yandex Maps
    reactStrictMode: false,
}

module.exports = nextConfig