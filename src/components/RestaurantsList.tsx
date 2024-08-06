import convertDate from "@/utils/functions/convertDate";
import deleteRestaurantById from "@/utils/functions/deleteRestaurantById";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

interface RestaurantsListProps {
  statusMenu: string;
}

const RestaurantsList = ({ statusMenu }: RestaurantsListProps) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: { restaurants, user } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const [restaurantsResponse, userResponse] = await Promise.all([
        supabase.from("restaurants").select("*"),
        supabase.auth.getUser(),
      ]);

      const restaurants = restaurantsResponse.data;
      const user = userResponse.data.user;

      return { restaurants, user };
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteRestaurantById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    if (statusMenu === "all") return restaurant;
    if (statusMenu === "active") return restaurant.status === "active";
    if (statusMenu === "draft") return restaurant.status === "draft";
    if (statusMenu === "archived") return restaurant.status === "archived";
  });

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
            {filteredRestaurants && filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <tr id={restaurant.id} key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize">
                    {restaurant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 capitalize ">
                    <p className="border w-fit rounded-full px-2 font-semibold">
                      {restaurant.status}
                    </p>
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
                    <Link
                      href={`/restaurants/${restaurant.id}`}
                      className="text-blue-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.4rem"
                        width="1.4rem">
                        <path d="M21 15.344l-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z" />
                      </svg>
                    </Link>
                    <button
                      className="text-red-600"
                      onClick={async () => await mutateAsync(restaurant.id)}>
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
