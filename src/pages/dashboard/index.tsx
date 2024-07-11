import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import SideNav from "@/components/SideNav";
import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import convertDate from "@/utils/convertDate";

type Restaurant = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  location: string;
  status: string;
  cuisine: string;
};

const Dashboard = () => {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
    };

    const fetchRestaurants = async () => {
      const { data: restaurants, error } = await supabase
        .from("restaurants")
        .select("*");

      if (error) {
        console.error("Error fetching restaurants:", error.message);
        return;
      }
      setRestaurants(restaurants || []);
    };

    fetchUser();
    fetchRestaurants();
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.parentElement?.parentElement?.id;

    try {
      if (window.confirm("Are you sure you want to delete this restaurant?")) {
        const { error } = await supabase
          .from("restaurants")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting restaurant:", error.message);
          return;
        }
        setRestaurants(
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      return;
    }
  };

  return (
    <section className="flex flex-col">
      <TopNav firstItem="Dashboard" menu={["Restaurants", "All restaurants"]} />

      <div className="flex justify-between">
        <ul className="flex bg-bg_2 gap-3 px-1 py-1 w-fit rounded-lg">
          <button className="bg-transparent px-3 font-medium text-slate-500 cursor-pointer focus:bg-white focus:text-black rounded py-0.5">
            All
          </button>
          <button className="bg-transparent px-3 font-medium text-slate-500 cursor-pointer focus:bg-white focus:text-black rounded py-0.5">
            Active
          </button>
          <button className="bg-transparent px-3 font-medium text-slate-500 cursor-pointer focus:bg-white focus:text-black rounded py-0.5">
            Draft
          </button>
          <button className="bg-transparent px-3 font-medium text-slate-500 cursor-pointer focus:bg-white focus:text-black rounded py-0.5">
            Archived
          </button>
        </ul>

        <div className="flex gap-5 ">
          <button className="flex items-center bg-white border rounded-lg px-2 font-semibold gap-1 hover:bg-bg_2 transition-all">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="1em"
              width="1em">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filter
          </button>
          <button className="flex items-center bg-white rounded-lg px-2 font-semibold border gap-1 hover:bg-bg_2 transition-all">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em">
              <path d="M8.71 7.71L11 5.41V15a1 1 0 002 0V5.41l2.29 2.3a1 1 0 001.42 0 1 1 0 000-1.42l-4-4a1 1 0 00-.33-.21 1 1 0 00-.76 0 1 1 0 00-.33.21l-4 4a1 1 0 101.42 1.42zM21 14a1 1 0 00-1 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 00-2 0v4a3 3 0 003 3h14a3 3 0 003-3v-4a1 1 0 00-1-1z" />
            </svg>
            Export
          </button>
          <Link
            href="/dashboard/create-restaurant"
            className="flex items-center bg-contrast rounded-lg px-2 text-white font-semibold gap-1 hover:opacity-90 transition-all">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em">
              <defs>
                <style />
              </defs>
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
              <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
            </svg>{" "}
            Add Restaurant
          </Link>
        </div>
      </div>

      <div className="bg-white w-full flex flex-col border shadow-md mt-2 py-6 px-7 rounded-lg">
        <h2 className="font-semibold text-3xl">Restaurants</h2>
        <p className="text-slate-500">
          Manage your restaurants menus and view their performance.
        </p>

        <table className="mt-10 border w-full">
          <thead className="border bg-bg_1">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                Cuisine
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                Locations
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                Created at
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4 tracking-wider">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <tr id={restaurant.id} key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {restaurant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {restaurant.status}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {restaurant.cuisine}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {restaurant.location}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {convertDate(restaurant.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-6 justify-center">
                    <button className="text-blue-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.4rem"
                        width="1.4rem">
                        <path d="M21 15.344l-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z" />
                      </svg>
                    </button>
                    <button className="text-red-600" onClick={handleDelete}>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1.4rem"
                        width="1.4rem">
                        <path d="M20 5H9l-7 7 7 7h11a2 2 0 002-2V7a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-5 pt-10 flex justify-center text-contrast text-xl">
                  <Link
                    href="/dashboard/create-restaurant"
                    className="flex items-center font-semibold gap-1 transition-all hover:opacity-90 hover:-translate-y-[2px]">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em">
                      <defs>
                        <style />
                      </defs>
                      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                    </svg>{" "}
                    Add Restaurant
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
