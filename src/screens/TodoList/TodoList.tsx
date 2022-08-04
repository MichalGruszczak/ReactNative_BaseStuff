import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

type TodoListProps = {
  navigation: any;
};

const TodoList = ({ navigation }: TodoListProps) => {
  return (
    <SafeAreaView>
      <Text>TodoList Screen</Text>
      <Button
        title="Todo Item 1"
        onPress={() => navigation.push("TodoItem", { name: "First Todo Item" })}
      />
      <Button
        title="Todo Item 2"
        onPress={() =>
          navigation.push("TodoItem", { name: "Second Todo Item" })
        }
      />
    </SafeAreaView>
  );
};

export default TodoList;
