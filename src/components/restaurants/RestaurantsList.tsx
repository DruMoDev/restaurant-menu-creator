import RestaurantType from "@/types/RestaurantType";
import fetchAllRestaurants from "@/utils/functions/fetchAllRestaurants";
import fetchUser from "@/utils/functions/fetchUser";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import RestaurantCard from "./RestaurantCard";

interface Props {
  sortParam: { searchQuery: string; statusMenu: string };
}

const RestaurantsList = ({ sortParam }: Props) => {
  const [sortedRestaurants, setSortedRestaurants] = useState<RestaurantType[]>(
    []
  );

  const {
    data: { restaurants, user } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const restaurants = await fetchAllRestaurants();
      const user = await fetchUser();
      return { restaurants, user };
    },
  });

  useEffect(() => {
    if (restaurants) {
      const { searchQuery, statusMenu } = sortParam;

      // Filtrar por statusMenu
      let filteredRestaurants = restaurants.filter((restaurant) => {
        if (statusMenu === "all") return true;
        return restaurant.status === statusMenu;
      });

      // Filtrar por searchQuery si existe
      if (searchQuery !== "") {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }

      setSortedRestaurants([...filteredRestaurants]);
    }
  }, [restaurants, sortParam]);

  return (
    <section className="bg-white w-full flex flex-col border shadow-md py-6 px-7 rounded-lg">
      <h2 className="font-semibold text-3xl">
        Restaurants {user && <span className="text-2xl">🍕</span>}
      </h2>
      <p className="text-slate-500">
        Manage your restaurants menus and view their performance.
      </p>

      {isLoading ? (
        <div className="flex flex-grow h-full justify-center items-center mt-5">
          <MoonLoader color="#2563EB" loading={isLoading} size={150} />
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
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
          <tbody>
            {sortedRestaurants.length > 0 ? (
              sortedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Link
                    href="/dashboard/create-restaurant"
                    className="flex items-center font-semibold gap-1 transition-all hover:opacity-90 hover:-translate-y-[2px] text-contrast  my-16 justify-center text-2xl">
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
      )}
    </section>
  );
};
export default RestaurantsList;
