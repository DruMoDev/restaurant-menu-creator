import { createClient } from "@/utils/supabase/client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const supabase = createClient();
  const router = useRouter();  
  
  return (
    <main className={`min-h-screen  bg-bg_1 ${inter.className}`}>
      <div className="flex flex-col items-center container xl:max-w-[1700px] mx-auto pt-24">
        <h1 className="text-5xl font-semibold flex flex-col items-center gap-3 text-quaternary">
          Welcome to:{" "}
          <span className="text-quinary font-black text-6xl">
            Menu Creator for Restaurants
          </span>
        </h1>
        <div className="flex mt-36 gap-20">
          <Link
            href="/login"
            className="py-3 bg-contrast font-bold text-3xl px-6 rounded hover:bg-opacity-90 transition-all text-white">
            Log in
          </Link>
          <Link
            href="/signup"
            className="py-3 bg-text_1 font-bold  text-white text-3xl px-6 rounded hover:bg-opacity-90 transition-all">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
