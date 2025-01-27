import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../client/supabase";
import { Login } from "../components/login";
import { Session } from "@supabase/supabase-js";
import "../global.css";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const isLoggedIn = session && session.user;

  return <View>{!isLoggedIn && <Login />}</View>;
}
