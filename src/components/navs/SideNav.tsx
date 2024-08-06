import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
    {/* Añadir diferentes Links a cada icono de la lista y añadirles el tooltip */}
      <nav className="h-full fixed top-0 left-0 bg-white border pt-5 min-w-16 flex justify-between flex-col  items-center text-lg z-50">
        <ul className="flex flex-col items-center">
          <li className="mb-5 cursor-pointer bg-contrast p-2 rounded-full">
            <Link href="/dashboard">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                className="bg-contrast">
                <path
                  className="text-white"
                  fill="currentColor"
                  d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 12.032a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM3 17.064a1 1 0 100 2h18a1 1 0 000-2H3z"
                />
              </svg>
            </Link>
          </li>

          <li className="mb-5 cursor-pointer p-2 rounded-full">
            <Link href="/dashboard">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z" />
              </svg>
            </Link>
          </li>

          <li className="mb-5 cursor-pointer p-2 rounded bg-bg_2">
            <Link href="/dashboard">
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                  fill="currentColor"
                  d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 12.032a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM3 17.064a1 1 0 100 2h18a1 1 0 000-2H3z"
                />
              </svg>
            </Link>
          </li>
          <li className="mb-5 cursor-pointer p-2 rounded-full">
            <Link href="/dashboard">
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                  fill="currentColor"
                  d="M2 6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 12.032a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM3 17.064a1 1 0 100 2h18a1 1 0 000-2H3z"
                />
              </svg>
            </Link>
          </li>

          {/* TODO: Hacer la pagina de ajustes */}
          <li className="mb-5 cursor-pointer p-2 rounded-full">
            <Link href="/dashboard">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1em"
                width="1em">
                <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </Link>
          </li>
        </ul>

        {/* TODO: Hacer un icono de sesion con su respectiva pagina para editar el perfil */}
        <ul className="flex flex-col items-center">
          <li>
            <button
              className="mb-5 cursor-pointer p-2 rounded bg-bg_2"
              onClick={async () => {
                if (window.confirm("Are you sure you want to log out?")) {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  router.push("/login");
                }
              }}>
              <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1 1h7v1H2v11h6v1H1V1zm9.854 3.146l3.34 3.34-3.327 3.603-.734-.678L12.358 8H4V7h8.293l-2.147-2.146.708-.708z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          <li className="mb-5 cursor-pointer p-2 rounded-full ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="1em"
              width="1em">
              <path d="M3 15l5.12-5.12A3 3 0 0110.24 9H13a2 2 0 110 4h-2.5m4-.68l4.17-4.89a1.88 1.88 0 012.92 2.36l-4.2 5.94A3 3 0 0114.96 17H9.83a2 2 0 00-1.42.59L7 19M2 14l6 6" />
            </svg>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
