import { toast } from "react-toastify";
import { createClient } from "../supabase/client";

const supabase = createClient();

const createRestaurant = async (info: {
  name: string;
  location: string;
  cuisine: string;
}) => {
  const { name, location, cuisine } = info;

  const { error } = await supabase
    .from("restaurants")
    .insert([{ name, location, cuisine }])
    .select();
  if (error) {
    console.error("Error creating restaurant:", error);
    toast.error("Error creating restaurant");
    return;
  }
  console.log("Submited succesfully");
  toast.success("Restaurant created successfully");
};

export default createRestaurant;
