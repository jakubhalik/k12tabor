import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '../components/ThemeProvider';

export const metadata: Metadata = {
    title: 'Příměstský tábor Kytnerova 12a, Medlánky',
    description: 'Příměstský tábor Kytnerova 12a, Medlánky',
    icons: {
        icon: '/faviconTime.JPG',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
