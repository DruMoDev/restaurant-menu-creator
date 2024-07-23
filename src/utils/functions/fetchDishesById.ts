import { createClient } from "../supabase/client";
import DishType from "@/types/DishType";

const fetchDishesById = async (sectionsIds: string[]) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("dishes")
    .select("*")
    .in("section_id", sectionsIds);

  return data as DishType[]
};

export default fetchDishesById;
