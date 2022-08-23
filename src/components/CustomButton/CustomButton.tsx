import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
};

const CustomButton = ({
  onPress,
  text,
  backgroundColor = "green",
  textColor = "white",
  width = 150,
  height = 40,
}: CustomButtonProps) => {
  // ! Shouldn't use inline styling - it's bad for performance - but there is a problem with styled-components
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, height }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
