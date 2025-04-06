import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { ProfileContext } from "./index";
import { sendPushNotification } from "@/client/services/pushNotifications";

const Home = ({ pushToken }: { pushToken: string }) => {
  console.log("profile context", ProfileContext);
  const profile = useContext(ProfileContext);
  console.log("profile:", profile);
  return (
    <View>
      <Text>Hello, you're logged in</Text>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(pushToken);
        }}
      />
    </View>
  );
};

export default Home;
