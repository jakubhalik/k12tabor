import Link from 'next/link';
import Cards from '../components/Cards';
import ModeToggle from '../components/ModeToggle';
import EmailForm from '../components/EmailForm';
import PostForm from '../components/PostForm';
import { sql } from '@vercel/postgres';
import Video from '@/components/Video';

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
        console.log('Form submitted.');
        try {
            const kidName = (formData.get('kidName') as string) || '';
            const kidSurname = (formData.get('kidSurname') as string) || '';
            const dateOfBirth = (formData.get('dateOfBirth') as string) || '';
            const tShirtSize = (formData.get('tShirtSize') as string) || '';
            const streetAndNumber =
                (formData.get('streetAndNumber') as string) || '';
            const city = (formData.get('city') as string) || '';
            const zip = (formData.get('zip') as string) || '';
            const country = (formData.get('country') as string) || '';
            const moreInfo = (formData.get('moreInfo') as string) || '';
            const parentName = (formData.get('parentName') as string) || '';
            const parentSurname =
                (formData.get('parentSurname') as string) || '';
            const phoneNumber = (formData.get('phoneNumber') as string) || '';
            const email = (formData.get('email') as string) || '';
            const note = (formData.get('note') as string) || '';
            await sql`CREATE TABLE IF NOT EXISTS registration_table (
                id SERIAL PRIMARY KEY, 
                kid_name VARCHAR(50) NOT NULL, 
                kid_surname VARCHAR(50) NOT NULL,
                date_of_birth VARCHAR(50) NOT NULL, 
                tshirt_size VARCHAR(50) NOT NULL,
                street_and_number VARCHAR(50) NOT NULL,
                city VARCHAR(50) NOT NULL,
                zip VARCHAR(50) NOT NULL,
                country VARCHAR(50) NOT NULL,
                more_info VARCHAR(255),
                parent_name VARCHAR(50) NOT NULL,
                parent_surname VARCHAR(50) NOT NULL,
                phone_number VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                note VARCHAR(255)
            )`;
            if (
                kidName &&
                kidSurname &&
                dateOfBirth &&
                tShirtSize &&
                streetAndNumber &&
                city &&
                zip &&
                country &&
                parentName &&
                parentSurname &&
                phoneNumber &&
                email
            ) {
                await sql`
                    INSERT INTO registration_table (kid_name, kid_surname, date_of_birth, tshirt_size, street_and_number, city, zip, country, more_info, parent_name, parent_surname, phone_number, email, note) 
                    VALUES (${kidName}, ${kidSurname}, ${dateOfBirth}, ${tShirtSize}, ${streetAndNumber}, ${city}, ${zip}, ${country}, ${moreInfo}, ${parentName}, ${parentSurname}, ${phoneNumber}, ${email}, ${note})
                `;
                console.log('Submitted form added to the database.');
                return { success: true };
            } else {
                console.error('Error with the form of the data.');
            }
        } catch (error) {
            console.error('Error in handlePostForm: ', error);
            return { success: false };
        }
    }

    return (
        <>
            <div
                className="flex flex-col min-h-screen bg-gradient-to-r from-violet-600 via-blue-700 to-blue-900 
                dark:from-black dark:to-sky-900"
            >
                <header className="flex items-center justify-between px-6 sm:px-8 py-4 border-b">
                    <Link className="sm:text-2xl font-bold text-white" href="/">
                        K12 Tábor
                    </Link>
                    <nav className="flex gap-4 md:gap-8 md:pr-2">
                        <Link
                            className="md:text-lg text-white hover:underline md:pr-2 pt-2 font-semibold"
                            href="https://www.k12medlanky.cz/"
                        >
                            O nás
                        </Link>
                        <ModeToggle />
                    </nav>
                </header>
                <main className="flex-1 pt-10">
                    <section className="flex flex-col items-center justify-center text-center p-8">
                        <h1 className="text-5xl font-bold text-white pt-8 pb-4 lg:pb-6">
                            Příměstský tábor K12
                        </h1>
                        <Link
                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-md 
                            bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 
                            active:border-white dark:from-blue-600 dark:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-700"
                            href="#signUp"
                        >
                            Hra o cestování časem
                        </Link>
                        <p className="text-lg pt-1 font-bold text-white">
                            aneb dějepis trochu jinak
                        </p>
                        <p className="pt-6 px-4 text-justify text-white">
                            Pro všechny, kteří mají rádi příběhy,{' '}
                            <span className="font-bold">dobrodružství </span>a
                            spoustu <span className="font-bold">zábavy</span>, a
                            také hledají nové{' '}
                            <span className="font-bold">kamarády </span> a
                            nechtějí jen sedět u mobilu a počítače: Je ti cca 8
                            – 14 let?
                        </p>
                        <p className="text-sm text-justify sm:text-base text-white px-8 sm:px-0 pt-2">
                            Pokud je alespoň jedna Vaše odpověď ano, naše
                            cestovní kancelář KAIROS má pro Vás přesně to, co
                            hledáte.{' '}
                            <span className="font-bold">
                                Pět dní a každý v jiné historické éře.{' '}
                            </span>
                            Zážitek, na který do konce života nezapomenete.
                            Zájezd napříč historií Říma. Od 20. století, přes
                            renesanci až po antiku a to vše během jednoho{' '}
                            <span className="font-bold">týdne</span>.
                        </p>
                        <p className="pt-12 lg:pt-6 text-5xl font-bold text-white">
                            8.7. - 12.7. 2024
                        </p>
                        <p className="text-lg text-white">8:30 - 17:00</p>
                        <p className="pt-6 text-sm text-center sm:text-base text-white">
                            Přemýšleli jste už někdy, jaké by to bylo{' '}
                            <span className="text-lg font-bold">
                                cestovat časem?
                            </span>{' '}
                            Zajímá Vás, jaké by to bylo setkat se s Leonardem da
                            Vinci nebo vidět Michelangela Buonarroti při malbě
                            Sixtinské Kaple? Studujete Latinská studia a
                            potřebujete zdroje pro svoji závěrečnou práci?
                            Neztrácejte tedy čas a{' '}
                            <a href="#signUp" className="underline">
                                přihlašte se
                            </a>{' '}
                            už teď!
                        </p>
                        <br />
                        <p className="text-4xl text-white font-semibold pt-4">
                            pro děti od 8 do 14 let
                        </p>
                        <p className="text-lg text-white">
                            Místo konání:{' '}
                            <span className="font-bold">
                                Kytnerova 12a, a venkovní hřiště v Medlánkách
                            </span>
                        </p>
                        <p className="text-white font-medium pt-1">
                            <span className="font-bold">
                                2600 Kč při přihlášení do 31. 5
                            </span>
                            . Poté 3000 Kč.
                        </p>
                    </section>
                    <section className="px-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Co vše děláme
                        </h2>
                        <Cards />
                        <div className="pt-8">
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
                        <Video />
                        <EmailForm action={handleEmailSubmission} />
                        <br />
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
