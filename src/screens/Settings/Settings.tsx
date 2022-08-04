import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

type SettingsProps = {
  navigation: any;
};

const Settings = ({ navigation }: SettingsProps) => {
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
      <Button
        title="Advanced Settings"
        onPress={() => navigation.push("AdvancedSettings")}
      />
    </SafeAreaView>
  );
};

export default Settings;
