type TodoItemType = {
  id: string;
  name: string;
  category?: string;
  desc?: string;
  priority: number;
  startDate?: string;
  isEditing: boolean;
  isDone: boolean;
  isExpanded: boolean;
};

export default TodoItemType;
