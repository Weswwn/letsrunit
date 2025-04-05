import { supabase } from "../supabase";

export const fetchUserSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  return session;
};
