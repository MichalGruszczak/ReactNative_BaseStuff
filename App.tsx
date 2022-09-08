import analytics from "@react-native-firebase/analytics";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./src/navigation/Navigator";

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          // @ts-expect-error: error
          ref={navigationRef}
          onReady={() => {
            // @ts-expect-error: error
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              // @ts-expect-error: error
              navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
