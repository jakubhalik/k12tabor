import Link from 'next/link';
import Cards from '../components/Cards';
import ModeToggle from '../components/ModeToggle';
import EmailForm from '../components/EmailForm';
import PostForm from '../components/PostForm';
import { sql } from '@vercel/postgres';
import { pool } from '../../postgresConfig';

export default async function Page() {
    async function handleEmailSubmission(formData: FormData) {
        'use server';
        console.log('Email submitted.');
        try {
            const email = formData.get('email');
            console.log('Email: ', email);
            if (typeof email === 'string' && email) {
                await sql`
                    CREATE TABLE IF NOT EXISTS email_list (
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(50) NOT NULL
                    )
                `;
                await sql`INSERT INTO email_list (email) VALUES (${email})`;
                console.log('Email added to the database.');
                return { success: true };
            }
        } catch (error) {
            console.error('Error in handleEmailSubmission: ', error);
            return { success: false };
        }
    }

    async function handlePostForm(formData: FormData) {
        'use server';
        console.log(
            'Form submitted to the server, now is gonna be being handled.'
        );
        const client = await pool.connect();
        try {
            const fields = Object.keys(formData);
            if (fields.length === 0) {
                console.error('Error: No data provided');
                return { success: false, error: 'No data provided' };
            }
            const values = Object.values(formData);
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS registration_table (
                    id SERIAL PRIMARY KEY,
                    ${fields
                    .map(
                        (field) =>
                            `"${field}" VARCHAR(50) ${field === 'moreInfo' || field === 'note' ? '' : 'NOT NULL'}`
                    )
                    .join(', ')}
                )
            `;
            console.log('Final CREATE TABLE query:', createTableQuery);
            const createTableResult = await client.query(createTableQuery);
            console.log(
                'the result of creating table if does not exist: ',
                createTableResult
            );

            if (fields.length === 0) {
                console.error('Error: No data provided');
                return { success: false, error: 'No data provided' };
            }

            const query = `
                INSERT INTO registration_table (${fields.join(', ')}) 
                VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
            `;

            const result = await client.query(query);
            console.log('Submitted form added to the database: ', result);
            return { success: true };
        } catch (error) {
            console.error('Error in handlePostForm: ', error);

            return { success: false };
        } finally {
            client.release();
        }
    }

    return (
        <>
            <div
                className="flex flex-col min-h-screen bg-gradient-to-r from-violet-400 via-blue-500 to-blue-700 
                dark:from-black dark:to-sky-900"
            >
                <header className="flex items-center justify-between px-6 sm:px-8 py-4 border-b">
                    <Link
                        className="text-md sm:text-2xl font-bold text-white"
                        href="/"
                    >
                        K12 Tábor
                    </Link>
                    <nav className="flex gap-4 md:gap-8 md:pr-2">
                        <Link
                            className="text-md md:text-lg text-white hover:underline md:pr-2 pt-2 font-semibold"
                            href="https://www.k12medlanky.cz/"
                        >
                            O nás
                        </Link>
                        <ModeToggle />
                    </nav>
                </header>
                <main className="flex-1 pt-8">
                    <section className="flex flex-col items-center justify-center text-center p-8">
                        <h1 className="text-5xl font-bold text-white pt-4 lg:pt-8">
                            Příměstský tábor K12
                        </h1>
                        <p className="text-xl text-white py-4">
                            Kytnerova 12a, Brno Medlánky
                        </p>
                        <Link
                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-md 
                            bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
                            active:border-white dark:from-blue-600 dark:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-700"
                            href="#signUp"
                        >
                            Neztrácejte čas!
                        </Link>
                        <p className="pt-6 text-2xl font-bold text-white">
                            8.7. - 12.7. 2024
                        </p>
                        <p className="text-lg text-white">8:30 - 17:00</p>
                        <p className="text-xl text-white font-semibold pt-4">
                            pro děti od 8 do 14 let
                        </p>
                        <p className="text-md text-white font-medium pt-1">
                            2600 Kč při přihlášení do 30. 4. Poté 3000 Kč.
                        </p>
                    </section>
                    <section className="p-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Co vše děláme
                        </h2>
                        <Cards />
                        <div className="pt-16 sm:pt-24">
                            <div className="bg-white rounded-md" id="signUp">
                                <p className="py-1 px-2 sm:text-xl font-semibold dark:text-black sm:text-center">
                                    Neztrácej čas a vydej se s námi na
                                    nezapomenutelnou pouť časem! Čeká tě
                                    objevování různých období naší historie,
                                    napínavý příběh, nová kamarádství a spousta
                                    zábavy.{' '}
                                </p>
                            </div>
                        </div>
                        <PostForm action={handlePostForm} />
                        <EmailForm action={handleEmailSubmission} />
                    </section>
                </main>
                <br />
                <footer
                    id="contact"
                    className="flex items-center justify-center py-8 text-white text-[15px] md:text-[18px] border-t"
                >
                    <span className="pr-4">© Kytnerova 12, Brno Medlánky</span>
                    <Link href="https://www.instagram.com/dorostmedlanky/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                width="20"
                                height="20"
                                x="2"
                                y="2"
                                rx="5"
                                ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />{' '}
                        </svg>
                    </Link>
                    <a href="mailto:dorostmedlanky@gmail.com" className="pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 4h16c1.1 0 1.99.9 1.99 2L22 18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </a>
                </footer>
            </div>
        </>
    );
}
