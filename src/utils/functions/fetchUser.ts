import { createClient } from "../supabase/client";

const fetchUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Error fetching user");
  if (data) {
    return data;
  }
};

export default fetchUser;
