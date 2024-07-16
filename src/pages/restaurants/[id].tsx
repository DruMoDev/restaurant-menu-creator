import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import TopNav from "@/components/TopNav";
import type RestaurantType from "@/types/Restaurant";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

const Restaurant = () => {
  const supabase = createClient();
  const router = useRouter();
  const id = router.query.id;

  const [currentRestaurant, setCurrentRestaurant] =
    useState<RestaurantType>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const { data: restaurants } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id);
      console.log(
        "Llamada a la base de datos para el restaurante",
        restaurants && restaurants[0].name
      );

      return restaurants && setCurrentRestaurant(restaurants[0]);
    },
  });

  if (isLoading || !currentRestaurant) {
    return <></>;
  }

  return (
    <>
      <TopNav
        firstItem="restaurants"
        menu={["menu creator", currentRestaurant.name]}
        searchActive={false}
      />

      <section className="bg-white w-full flex flex-col border shadow-md mt-2 py-6 px-7 rounded-lg flex-grow">
        <h2 className="font-semibold text-3xl"> {currentRestaurant.name}</h2>
        <p className="text-slate-500 capitalize">
            {currentRestaurant.location} - {currentRestaurant.cuisine} - {currentRestaurant.status}
        </p>
        

      </section>
    </>
  );
};
export default Restaurant;

Restaurant.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};
