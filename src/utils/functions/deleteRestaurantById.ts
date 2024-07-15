import { createClient } from "../supabase/client";

const supabase = createClient();

const deleteRestaurantById = async (id: string) => {
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
    }
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return;
  }
};

export default deleteRestaurantById;
