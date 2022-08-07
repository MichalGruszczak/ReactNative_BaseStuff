import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";

import CustomInput from "../../components/CustomInput/CustomInput";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  id: string;
  isAdmin: boolean;
};

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    const registrationData: RegistrationData = {
      ...data,
      id: uuid.v4() as string,
      isAdmin,
    };

    // TODO - registration logic from Firebase
    console.log(registrationData);

    reset({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Register Screen</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          name="name"
          placeholder="Name"
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must have at least 3 characters",
            },
          }}
          control={control}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          control={control}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Name must have at least 3 characters",
            },
          }}
          control={control}
          secureTextEntry
        />
        <CheckBox
          center
          title="Click Here"
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
    </KeyboardAvoidingView>
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
