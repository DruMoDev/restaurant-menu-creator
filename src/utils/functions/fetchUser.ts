import { createClient } from "../supabase/client";

const fetchUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error;
  if (data) {
    return data 
  }
};

export default fetchUser;
