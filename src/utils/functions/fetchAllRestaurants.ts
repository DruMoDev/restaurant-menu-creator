import RestaurantType from "@/types/RestaurantType";
import { createClient } from "../supabase/client";

const fetchAllRestaurants = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("restaurants").select("*");
  if (error) throw error;
  if (data) {
    return data as RestaurantType[];
  }
};

export default fetchAllRestaurants;
