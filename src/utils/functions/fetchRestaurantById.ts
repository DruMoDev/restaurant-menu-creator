import RestaurantType from "@/types/RestaurantType";
import { createClient } from "../supabase/client";

const fetchRestaurantById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id);
  if (error) throw error;
  if (data) {
    return data[0] as RestaurantType;
  }
  // return data?.[0];
};

export default fetchRestaurantById;
