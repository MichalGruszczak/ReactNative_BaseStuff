import analytics from "@react-native-firebase/analytics";

export const logOpenModal = async (modalType: string) => {
  await analytics().logEvent("open_modal", { modalType });
};

export const logLoginSuccess = async () => {
  await analytics().logEvent("Login_Success");
};

export const logRegisterSuccess = async () => {
  await analytics().logEvent("firestore_register_success");
};

export const logAddTodo = async (title: string, isImportant: boolean) => {
  analytics().logEvent("add_todo", { title, isImportant });
};

export const logEditTodo = async (title: string) => {
  await analytics().logEvent("edit_todo", { title });
};

export const logDeleteTodo = async () => {
  await analytics().logEvent("delete_todo");
};

export const logFinishTodo = async () => {
  await analytics().logEvent("finish_todo");
};
