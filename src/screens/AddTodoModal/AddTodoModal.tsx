import { yupResolver } from "@hookform/resolvers/yup";
import firestore from "@react-native-firebase/firestore";
import { CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import * as Yup from "yup";

import CustomInput from "../../components/CustomInput/CustomInput";

type AddTodoModalProps = {
  navigation: any;
};

type AddTodoData = {
  title: string;
  description?: string;
  isImportant: boolean;
  isDone: boolean;
};

const addTodoFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title length should be at least 3 characters"),
  description: Yup.string().max(300, "Must be max 300 characters"),
});

const addTodoFormValidationOptions = {
  resolver: yupResolver(addTodoFormSchema),
};

const AddTodoModal = ({ navigation }: AddTodoModalProps) => {
  const [isImportant, setIsImportant] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm(
    addTodoFormValidationOptions
  );

  const { errors } = formState;

  useEffect(() => {
    reset({
      title: "",
      description: "",
    });
  }, []);

  const closeModal = () => {
    navigation.goBack();

    reset({
      title: "",
      description: "",
    });
    setIsImportant(false);
  };

  const handleSubmitAddTodo = (data: FieldValues) => {
    const addTodoData: AddTodoData = {
      title: data.title,
      description: data.description,
      isImportant,
      isDone: false,
    };

    firestore()
      .collection("Todos")
      .add(addTodoData)
      .then(() => {
        Alert.alert("Todo added to database!");
        closeModal();
      })
      .catch((error) => {
        Alert.alert(`Firestore error: ${error.message}`);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.modalTitle}>Add Todo</Text>
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
          onPress={handleSubmit(handleSubmitAddTodo)}
          title="Submit"
        />
      </View>
    </View>
  );
};

export default AddTodoModal;

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
