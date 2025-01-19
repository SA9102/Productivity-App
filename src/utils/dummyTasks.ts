/*** Returns an array of dummy tasks. For testing purposes. ***/

import taskType from "../types/taskType";

const dummyTasks: taskType[] = [
  {
    id: "1",
    name: "Foo",
    category: "Travel",
    description: "Desc",
    priority: "low",
    isComplete: false,
  },
  {
    id: "2",
    name: "Bar",
    category: "Food",
    description: "Desc",
    priority: "high",
    isComplete: true,
  },
  {
    id: "3",
    name: "Baz",
    category: "Travel",
    description: "Desc",
    priority: "medium",
    isComplete: false,
  },
  {
    id: "4",
    name: "Foobar",
    category: "Work",
    description: "Desc",
    priority: "none",
    isComplete: false,
  },
  {
    id: "5",
    name: "Qux",
    category: "Travel",
    description: "Description of Qux",
    priority: "low",
    isComplete: false,
  },
];

export default dummyTasks;
