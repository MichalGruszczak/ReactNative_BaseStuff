import React from "react";
import { SafeAreaView, Text, Button, View, StyleSheet } from "react-native";

import CustomButton from "../../components/CustomButton/CustomButton";

type TodoListProps = {
  navigation: any;
};

const TodoList = ({ navigation }: TodoListProps) => {
  const openModal = () => {
    navigation.navigate("AddTodoModal");
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.addButton}>
        <CustomButton onPress={openModal} text="Add" />
      </View>
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 10,
  },
});
