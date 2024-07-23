import MenuType from "@/types/MenuType";
import { createClient } from "../supabase/client";

const fetchMenuById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("restaurant_id", id);

  if (error) throw error;
  return data as MenuType[];
};

export default fetchMenuById;
