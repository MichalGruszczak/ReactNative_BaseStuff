export type AddTodoData = {
  title: string;
  description?: string;
  isImportant: boolean;
  isDone: boolean;
};

export type EditTodoData = {
  title: string;
  description?: string;
  isImportant: boolean;
};
