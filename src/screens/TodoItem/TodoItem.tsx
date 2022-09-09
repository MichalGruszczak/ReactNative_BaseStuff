import React from "react";
import { SafeAreaView, Text, Button, StyleSheet, View } from "react-native";

import colors from "../../constants/colors";

type TodoItemProps = {
  route: any;
  navigation: any;
};

const TodoItem = ({ route, navigation }: TodoItemProps) => {
  const { title, description, isImportant, isDone } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`TodoItem "${title}" Screen`}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.importantInfoContainer}>
        <Text style={styles.importantText}>
          {isImportant && !isDone && "This task is important !!!"}
        </Text>
      </View>
      <View style={styles.isDoneInfoContainer}>
        <Text style={[styles.isDoneInfoText, isDone && styles.doneText]}>
          {isDone ? "This task is done!" : "This task isn't done yet."}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Settings Screen"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  titleContainer: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  description: {
    textAlign: "center",
  },
  importantInfoContainer: {
    marginTop: 24,
  },
  importantText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.important,
    textTransform: "uppercase",
  },
  isDoneInfoContainer: {
    marginTop: 24,
  },
  isDoneInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.taskNotDone,
  },
  doneText: {
    color: colors.text.taskDone,
    textTransform: "uppercase",
  },
  buttonContainer: {
    marginTop: 48,
  },
});
