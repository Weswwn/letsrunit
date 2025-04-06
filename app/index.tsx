import { View } from "react-native";
import { useState, useEffect, createContext, useRef } from "react";
import { supabase } from "../client/supabase";
import Login from "../components/login";
import { Session } from "@supabase/supabase-js";
import "../global.css";
import { fetchUserSession } from "@/client/services/login";
import Home from "./Home";
import { registerForPushNotificationsAsync } from "@/client/services/pushNotifications";
import * as Notifications from "expo-notifications";

export const ProfileContext = createContext<Session | null>(null);

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  console.log(
    "notification details:",
    notification,
    notification?.request.content.title,
    notification?.request.content.body
  );
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

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userSession]);

  const isLoggedIn = userSession && userSession.user;
  return (
    <ProfileContext.Provider value={userSession}>
      <View>{isLoggedIn ? <Home pushToken={expoPushToken} /> : <Login />}</View>
    </ProfileContext.Provider>
  );
}
