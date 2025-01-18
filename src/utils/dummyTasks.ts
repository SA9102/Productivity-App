/*** Returns an array of dummy tasks. For testing purposes. ***/

import taskType from "../types/taskType";

const dummyTasks: taskType[] = [
  {
    id: "1",
    name: "Foo",
    category: "Travel",
    description: "Description of Foo",
    priority: 1,
    isComplete: false,
  },
  {
    id: "2",
    name: "Bar",
    category: "Food",
    description: "Description of Bar",
    priority: 3,
    isComplete: true,
  },
  {
    id: "3",
    name: "Baz",
    category: "Travel",
    description: "Description of Baz",
    priority: 2,
    isComplete: false,
  },
  {
    id: "4",
    name: "Foobar",
    category: "Work",
    description: "Description of Foobar",
    priority: 0,
    isComplete: false,
  },
  {
    id: "5",
    name: "Qux",
    category: "Travel",
    description: "Description of Qux",
    priority: 1,
    isComplete: false,
  },
];

export default dummyTasks;
