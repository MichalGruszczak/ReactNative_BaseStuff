import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddTodoModal from "../../screens/AddTodoModal";
import TodoItem from "../../screens/TodoItem";
import TodoList from "../../screens/TodoList";

const Stack = createNativeStackNavigator();

type TodoItemProps = {
  route: any;
};

const TodoStack = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{ title: "Todo List" }}
      />
      <Stack.Screen
        name="TodoItem"
        component={TodoItem}
        options={({ route }: TodoItemProps) => ({
          title: route.params.name,
        })}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="AddTodoModal"
          component={AddTodoModal}
          options={{ title: "Add Todo Modal", headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TodoStack;
