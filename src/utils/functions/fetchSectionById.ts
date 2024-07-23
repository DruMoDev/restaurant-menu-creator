import SectionType from "@/types/SectionType";
import { createClient } from "../supabase/client";

const fetchSectionById = async (menusIds: string[]) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("sections")
    .select("*")
    .in("menu_id", menusIds);

  return data as SectionType[]
};

export default fetchSectionById;
