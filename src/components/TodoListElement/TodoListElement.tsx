import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../CustomButton/CustomButton";

type TodoListElementProps = {
  navigation: any;
  title: string;
  description?: string;
  isImportant: boolean;
  isDone: boolean;
};

const TodoListElement = ({
  navigation,
  title,
  description,
  isImportant,
  isDone,
}: TodoListElementProps) => {
  const editTodo = () => {
    console.log("Edit Todo");
  };

  const deleteTodo = () => {
    console.log("Delete Todo");
  };

  const moreInfo = () => {
    navigation.push("TodoItem", {
      title,
      description,
      isImportant,
      isDone,
    });
  };

  const markAsDone = () => {
    console.log("Edit Todo");
  };

  const statusText = useMemo(() => {
    let text = "In progress ...";

    if (isDone) {
      text = "Done";
    } else if (isImportant) {
      text = "In progress ... IMPORTANT";
    }

    return text;
  }, [isDone, isImportant]);

  return (
    <View
      style={[
        styles.todo,
        isImportant && styles.todoImportant,
        isDone && styles.todoDone,
      ]}
    >
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.statusSection}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <View style={styles.buttonsSection}>
        <CustomButton
          onPress={editTodo}
          width={70}
          height={50}
          text="Edit"
          backgroundColor="blue"
          disabled={isDone}
        />
        <CustomButton
          onPress={deleteTodo}
          width={70}
          height={50}
          text="Delete"
          backgroundColor="red"
          disabled={isDone}
        />
        <CustomButton
          onPress={moreInfo}
          width={70}
          height={50}
          text="More"
          backgroundColor="purple"
        />
        <CustomButton
          onPress={markAsDone}
          width={70}
          height={50}
          text="Done"
          backgroundColor="green"
          disabled={isDone}
        />
      </View>
    </View>
  );
};

export default TodoListElement;

const styles = StyleSheet.create({
  todo: {
    width: "90%",
    height: 130,
    marginTop: 10,
    borderRadius: 6,
    paddingBottom: 8,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "grey",
  },
  todoImportant: {
    backgroundColor: "#e8b923",
  },
  todoDone: {
    backgroundColor: "#90EE90",
  },
  titleSection: {
    flexBasis: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  statusSection: {
    flexBasis: 20,
  },
  statusText: {
    fontSize: 14,
    textAlign: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  buttonsSection: {
    flexBasis: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
