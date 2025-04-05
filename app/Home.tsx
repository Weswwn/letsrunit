import { useContext } from "react";
import { View, Text } from "react-native";
import { ProfileContext } from "./index";

const Home = () => {
  console.log("profile context", ProfileContext);
  const profile = useContext(ProfileContext);
  console.log("profile:", profile);
  return (
    <View>
      <Text>Hello, you're logged in</Text>
    </View>
  );
};

export default Home;
