export type CustomButtonProps = {
  onPress: () => void;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
};

export type CustomInputProps = {
  control: any;
  name: string;
  error: any;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export type TodoListElementProps = {
  navigation: any;
  title: string;
  description?: string;
  isImportant: boolean;
  isDone: boolean;
  id: string;
};
