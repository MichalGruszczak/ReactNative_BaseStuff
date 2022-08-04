import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AppInfo from "../../screens/AppInfo";
import Info from "../../screens/Info";
import UserInfo from "../../screens/UserInfo";

const Stack = createNativeStackNavigator();

const InfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen
        name="AppInfo"
        component={AppInfo}
        options={{ title: "App Info" }}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{ title: "User Info" }}
      />
    </Stack.Navigator>
  );
};

export default InfoStack;
