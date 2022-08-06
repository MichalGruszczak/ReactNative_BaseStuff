import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Login from "../screens/Login";
import Register from "../screens/Register";

import InfoStack from "./stacks/InfoStack";
import SettingsStack from "./stacks/SettingsStack";
import TodoStack from "./stacks/TodoStack";

// TODO - Zustand Provider with Auth state
// TODO - LOGOUT

const isAuth = false;

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
        },
        tabBarIconStyle: { display: "none" },
      }}
    >
      {isAuth ? (
        <>
          <Tab.Screen name="TodoList" component={TodoStack} />
          <Tab.Screen name="Info" component={InfoStack} />
          <Tab.Screen name="Settings" component={SettingsStack} />
        </>
      ) : (
        <>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Settings" component={SettingsStack} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default Navigator;
