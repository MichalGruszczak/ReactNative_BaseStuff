import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";

import CustomButton from "../../components/CustomButton/CustomButton";
import TodoListElement from "../../components/TodoListElement/TodoListElement";

type TodoListProps = {
  navigation: any;
};

const TodoList = ({ navigation }: TodoListProps) => {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Todos")
      .onSnapshot((querySnapshot) => {
        const list: any = [];
        querySnapshot.forEach((doc) => {
          const { title, description, isImportant, isDone } = doc.data();
          list.push({
            id: doc.id,
            title,
            description,
            isImportant,
            isDone,
          });
        });

        setTodos(list);
      });
    return () => subscriber();
  }, []);

  const openModal = () => {
    navigation.navigate("AddTodoModal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoListElement
            navigation={navigation}
            title={item.title}
            description={item.description}
            isImportant={item.isImportant}
            isDone={item.isDone}
          />
        )}
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
