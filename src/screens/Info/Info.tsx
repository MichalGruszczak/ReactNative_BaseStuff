import auth from "@react-native-firebase/auth";
import React from "react";
import { SafeAreaView, Text, Button, Alert } from "react-native";

type InfoProps = {
  navigation: any;
};

const Info = ({ navigation }: InfoProps) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => Alert.alert("User signed out!"));
  };

  return (
    <SafeAreaView>
      <Text>Info Screen</Text>
      <Button title="App Info" onPress={() => navigation.push("AppInfo")} />
      <Button title="User Info" onPress={() => navigation.push("UserInfo")} />
      <Button color="red" title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default Info;
