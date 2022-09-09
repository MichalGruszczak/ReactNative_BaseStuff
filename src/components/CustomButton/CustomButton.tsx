import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import type { CustomButtonProps } from "../../types/components";

const CustomButton = ({
  onPress,
  text,
  backgroundColor = "green",
  textColor = "white",
  width = 150,
  height = 40,
  disabled = false,
}: CustomButtonProps) => {
  // ! Shouldn't use inline styling - it's bad for performance - but there is a problem with styled-components
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, width, height },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.3,
  },
});
