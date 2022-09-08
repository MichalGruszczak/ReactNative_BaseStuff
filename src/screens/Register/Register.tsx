import { yupResolver } from "@hookform/resolvers/yup";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import uuid from "react-native-uuid";
import * as Yup from "yup";

import CustomInput from "../../components/CustomInput/CustomInput";

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  id: string;
  isAdmin: boolean;
};

const registerFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name length should be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password length should be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must and should match"),
});

const validationOptions = { resolver: yupResolver(registerFormSchema) };

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { control, handleSubmit, reset, formState } =
    useForm(validationOptions);

  const logRegisterSuccess = async () => {
    await analytics().logEvent("firestore_register_success");
  };

  const { errors } = formState;

  const handleRegister = (data: FieldValues) => {
    const registrationData: RegistrationData = {
      name: data.name,
      email: data.email,
      password: data.password,
      id: uuid.v4() as string,
      isAdmin,
    };

    auth()
      .createUserWithEmailAndPassword(
        registrationData.email,
        registrationData.password
      )
      .then(() => {
        firestore()
          .collection("Users")
          .add(registrationData)
          .then(() => {
            Alert.alert("User account created in database & signed in!");
            logRegisterSuccess();
          })
          .catch((error) => {
            Alert.alert(`Firestore error: ${error.message}`);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }

        Alert.alert(`Registration error: ${error.message}`);
      });

    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          name="name"
          error={errors.name}
          placeholder="Name"
          control={control}
        />
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
        <CustomInput
          name="confirmPassword"
          error={errors.confirmPassword}
          placeholder="Confirm password"
          control={control}
          secureTextEntry
        />
        <CheckBox
          center
          title="Are you Admin?"
          checked={isAdmin}
          onPress={() => setIsAdmin(!isAdmin)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit(handleRegister)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 10,
    width: "80%",
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
});
