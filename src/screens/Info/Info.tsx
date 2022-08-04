import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

type InfoProps = {
  navigation: any;
};

const Info = ({ navigation }: InfoProps) => {
  return (
    <SafeAreaView>
      <Text>Info Screen</Text>
      <Button title="App Info" onPress={() => navigation.push("AppInfo")} />
      <Button title="User Info" onPress={() => navigation.push("UserInfo")} />
    </SafeAreaView>
  );
};

export default Info;
