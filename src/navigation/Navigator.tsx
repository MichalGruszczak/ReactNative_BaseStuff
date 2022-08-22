import auth from "@react-native-firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";

import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Login from "../screens/Login";
import Register from "../screens/Register";

import InfoStack from "./stacks/InfoStack";
import SettingsStack from "./stacks/SettingsStack";
import TodoStack from "./stacks/TodoStack";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { setUserOnAuth, setUserOnLogout } = useUser();
  const { isAuth, setAuthTrue, setAuthFalse } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((eventUser) => {
      if (eventUser) {
        setUserOnAuth(eventUser);
        setAuthTrue();
      } else {
        setUserOnLogout();
        setAuthFalse();
      }
    });
    return subscriber;
  }, []);

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
