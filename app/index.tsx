import { View } from "react-native";
import { useState, useEffect, createContext } from "react";
import { supabase } from "../client/supabase";
import Login from "../components/login";
import { Session } from "@supabase/supabase-js";
import "../global.css";
import { fetchUserSession } from "@/client/services/login";
import Home from "./Home";

export const ProfileContext = createContext<Session | null>(null);

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const session = await fetchUserSession();
      setUserSession(session);
    };

    getUserSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });
  }, []);

  const isLoggedIn = userSession && userSession.user;
  return (
    <ProfileContext.Provider value={userSession}>
      <View>{isLoggedIn ? <Home /> : <Login />}</View>
    </ProfileContext.Provider>
  );
}
