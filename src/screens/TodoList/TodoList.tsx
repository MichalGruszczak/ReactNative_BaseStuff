import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import CustomButton from "../../components/CustomButton/CustomButton";
import TodoListElement from "../../components/TodoListElement/TodoListElement";

type TodoListProps = {
  navigation: any;
};

const TodoList = ({ navigation }: TodoListProps) => {
  const openModal = () => {
    navigation.navigate("AddTodoModal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TodoListElement
        navigation={navigation}
        title="Task 1"
        description="Throwing consider dwelling bachelor joy her proposal laughter. Raptures returned disposed one entirely her men ham. By to admire vanity county an mutual as roused."
        isImportant={false}
        isDone={false}
      />
      <TodoListElement
        navigation={navigation}
        title="Task 2"
        description="Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment."
        isImportant
        isDone={false}
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
