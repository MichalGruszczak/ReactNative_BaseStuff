import { yupResolver } from "@hookform/resolvers/yup";
import analytics from "@react-native-firebase/analytics";
import firestore from "@react-native-firebase/firestore";
import { CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import * as Yup from "yup";

import CustomInput from "../../components/CustomInput/CustomInput";

type EditTodoModalProps = {
  navigation: any;
  route: any;
};

type EditTodoData = {
  title: string;
  description?: string;
  isImportant: boolean;
};

const logEditTodo = async (title: string) => {
  await analytics().logEvent("edit_todo", { title });
};

const editTodoFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title length should be at least 3 characters"),
  description: Yup.string().max(300, "Must be max 300 characters"),
});

const editTodoFormValidationOptions = {
  resolver: yupResolver(editTodoFormSchema),
};

const EditTodoModal = ({ navigation, route }: EditTodoModalProps) => {
  const [isImportant, setIsImportant] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm(
    editTodoFormValidationOptions
  );

  const { errors } = formState;

  useEffect(() => {
    reset({
      title: route.params.title,
      description: route.params.description,
    });
    setIsImportant(route.params.isImportant);
  }, []);

  const closeModal = () => {
    navigation.goBack();

    reset({
      title: "",
      description: "",
    });
    setIsImportant(false);
  };

  const handleSubmitEditTodo = async (data: FieldValues) => {
    const editTodoData: EditTodoData = {
      title: data.title,
      description: data.description,
      isImportant,
    };

    await firestore()
      .collection("Todos")
      .doc(route.params.id)
      .update({
        title: editTodoData.title,
        description: editTodoData.description,
        isImportant: editTodoData.isImportant,
      })
      .then(() => {
        Alert.alert("Todo updated!");
        logEditTodo(editTodoData.title);
        closeModal();
      })
      .catch(() => {
        Alert.alert("Something went wrong");
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={styles.modalTitle}
      >{`Edit Todo: "${route.params.title}"`}</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          name="title"
          error={errors.title}
          placeholder="Title"
          control={control}
        />
        <CustomInput
          name="description"
          error={errors.description}
          placeholder="Description"
          control={control}
        />
        <CheckBox
          center
          title="Is Important?"
          checked={isImportant}
          onPress={() => setIsImportant(!isImportant)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button color="red" onPress={closeModal} title="Dismiss" />
        <Button
          color="green"
          onPress={handleSubmit(handleSubmitEditTodo)}
          title="Submit"
        />
      </View>
    </View>
  );
};

export default EditTodoModal;

const styles = StyleSheet.create({
  buttonsContainer: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
  },
});
