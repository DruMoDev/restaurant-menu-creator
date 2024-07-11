import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen  bg-bg_1">
      <div className="flex flex-col items-center container xl:max-w-[1700px] mx-auto pt-24">
        <div className="shadow-md rounded px-8 pt-6 pb-8 border w-1/2 bg-white">
          <h1 className="text-5xl font-bold mb-6 text-quaternary">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-lg font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-contrast focus:shadow-outline text-lg"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-600 text-lg font-bold mb-2"
                htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-contrast focus:shadow-outline text-lg"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-contrast hover:bg-opacity-90 text-white font-bold text-2xl py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
                type="submit"
                onClick={handleLogin}>
                Log in
              </button>
              <p className="text-quaternary mt-1 font-semibold  rounded focus:outline-none focus:shadow-outline text-lg transition-all flex flex-col">
                You don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-quinary place-self-end text-2xl font-bold transition-all">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Login;
