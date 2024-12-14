import TodoItemType from "../types/TodoItemType";
import TodoItem from "./TodoItem";

import "../styles/TodoList.css";

type props = {
  todoList: TodoItemType[];
};

const TodoList = ({ todoList }: props) => {
  return (
    <div className="todo-list">
      {todoList.map((item: TodoItemType) => {
        return <TodoItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default TodoList;
