import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
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
        firestore()
          .collection("Users")
          .where("email", "==", eventUser.email)
          .get()
          .then((querySnapshot) => {
            const queryUsers: any = [];
            querySnapshot.docs.forEach((user) => {
              queryUsers.push(user);
            });
            setUserOnAuth(queryUsers[0].data());
            setAuthTrue();
          });
      } else {
        setAuthFalse();
        setUserOnLogout();
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
