import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

import CustomInput from "../../components/CustomInput/CustomInput";
import { logLoginSuccess } from "../../utils/analytics";

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

  const handleLogin = (data: FieldValues) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        Alert.alert("Logged In");
        logLoginSuccess();
      })
      .catch((error) => {
        Alert.alert(error.message);
        crashlytics().recordError(error);
      });

    reset({
      email: "",
      password: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          name="email"
          error={errors.email}
          placeholder="Email"
          control={control}
        />

        <CustomInput
          name="password"
          error={errors.password}
          placeholder="Password"
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
    </View>
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
