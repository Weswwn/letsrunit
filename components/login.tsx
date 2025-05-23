import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../client/supabase";
import { Button, Input } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import { AuthOtpResponse } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<null | AuthOtpResponse["data"]>(
    null
  );

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  const redirectTo = makeRedirectUri();

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    setLoginData(data);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (loginData) {
    return (
      <View>
        <Text>Please check your email to complete login!</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Input
          onSubmitEditing={handleLogin}
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
    </View>
  );
};

export default Login;
