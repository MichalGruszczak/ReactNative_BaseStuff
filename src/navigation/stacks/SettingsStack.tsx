import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AdvancedSettings from "../../screens/AdvancedSettings";
import Settings from "../../screens/Settings";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="AdvancedSettings"
        component={AdvancedSettings}
        options={{ title: "Advanced Settings" }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
