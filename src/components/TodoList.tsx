import TodoItemType from "../types/TodoItemType";
import TodoItem from "./TodoItem";

import "../styles/TodoList.css";

type props = {
  todoList: TodoItemType[];
  onToggleTodoEdit: (arg1: string, arg2: boolean) => void;
};

const TodoList = ({ todoList, onToggleTodoEdit }: props) => {
  return (
    <div className="todo-list">
      {todoList.map((item: TodoItemType) => {
        return <TodoItem key={item.id} item={item} onToggleTodoEdit={onToggleTodoEdit} />;
      })}
    </div>
  );
};

export default TodoList;
