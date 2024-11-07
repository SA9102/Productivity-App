type TodoItemType = {
  id: string;
  name: string;
  category?: string;
  desc?: string;
  priority: number;
  isEditing: boolean;
  isDone: boolean;
};

export default TodoItemType;
