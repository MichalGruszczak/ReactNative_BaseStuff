import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

type TodoItemProps = {
  route: any;
  navigation: any;
};

const TodoItem = ({ route, navigation }: TodoItemProps) => {
  return (
    <SafeAreaView>
      <Text>TodoItem Screen</Text>
      <Text>{route.params.name}</Text>
      <Button
        title="Go to Settings Screen"
        onPress={() => navigation.navigate("Settings")}
      />
    </SafeAreaView>
  );
};

export default TodoItem;
