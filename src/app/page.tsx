import Link from "next/link";
import Cards from "../components/Cards";
import ModeToggle from "../components/ModeToggle";
import Countdown from "../components/Countdown";
import { sql } from "@vercel/postgres";

export default async function Page() {
  async function handleEmailSubmission(formData: FormData) {
    "use server";
    console.log("Form submitted");
    try {
      const email = formData.get("email");
      console.log("Email: ", email);
      if (typeof email === "string" && email) {
        await sql`INSERT INTO email_list (email) VALUES (${email})`;
        console.log("Email added to the database");
      }
    } catch (error) {
      console.error("Error in handleEmailSubmission: ", error);
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-orange-400 via-red-500 to-sky-500 dark:from-black dark:to-sky-900">
        <header className="flex items-center justify-between px-8 py-4 border-b">
          <Link className="text-2xl font-bold text-white" href="/">
            K12 Tábor
          </Link>
          <nav className="flex gap-4">
            <Link
              className="text-lg text-white hover:underline md:pr-4 pt-2"
              href="#contact"
            >
              Kontakt
            </Link>
            <Link
              className="text-lg text-white hover:underline pt-2"
              href="https://www.k12medlanky.cz/"
            >
              Náš sbor
            </Link>
            <ModeToggle />
          </nav>
        </header>
        <main className="flex-1 pt-8">
          <section className="flex flex-col items-center justify-center text-center p-8 space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Příměstský tábor K12
            </h1>
            <p className="text-xl text-white">Kytnerova 12a, Brno Medlánky</p>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              href="#signUp"
            >
              Neztrácej čas!
            </Link>
          </section>
          <section className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Co vše děláme
            </h2>
            <Cards />
            <div className="pt-24">
              <div className="bg-white rounded-md" id="signUp">
                <p className="py-1 px-2 text-xl font-semibold dark:text-black">
                  Neztrácej čas a radši pojď na tábor kde se bude cestovat
                  časem!
                  <br />
                  Scifi, zábava, hry, nová kamarádství a interaktivní vzdělání o
                  (nejen) historii hrou.
                </p>
              </div>
            </div>
            <br />
            <Countdown />
            <form
              action={handleEmailSubmission}
              className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto py-16"
            >
              <input
                className="flex-1 px-4 py-2 text-lg text-gray-900 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Přihlaš se k novinkám o táboru"
                name="email"
                type="email"
              />
              <button
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                type="submit"
              >
                Poslat @adresu
              </button>
            </form>
          </section>
        </main>
        <footer
          id="contact"
          className="flex items-center justify-center py-4 text-white text-[10px] md:text-[15px] border-t"
        >
          <span className="pr-4 md:pr-20">
            © 2024 Příměstský tábor, Kytnerova12, Brno Medlánky
          </span>
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
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />{" "}
            </svg>
          </Link>
        </footer>
      </div>
    </>
  );
}
