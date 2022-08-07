import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

import CustomInput from "../../components/CustomInput/CustomInput";

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  password: Yup.string().required("Password is required"),
});

const validationOptions = { resolver: yupResolver(loginFormSchema) };

const Login = () => {
  const { control, handleSubmit, formState, reset } =
    useForm(validationOptions);

  const { errors } = formState;

  // TODO - with Firebase
  const handleLogin = (data: FieldValues) => {
    console.log(JSON.stringify(data, null, 4));
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Login Screen</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          name="email"
          error={errors.email}
          placeholder="Email"
          // rules={{
          //   required: "Email is required",
          //   pattern: {
          //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          //     message: "Invalid email address",
          //   },
          // }}
          control={control}
        />

        <CustomInput
          name="password"
          error={errors.password}
          placeholder="Password"
          // rules={{ required: "Password is required" }}
          control={control}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit(handleLogin)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
  },
});
