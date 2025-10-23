import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Карта парков САО',
    description: 'Интерактивная карта парков Северного административного округа Москвы',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body className="m-0 p-0 font-sans overflow-hidden">{children}</body>
        </html>
    );
}