/*** Returns an array of dummy tasks. For testing purposes. ***/

import taskType from "../types/taskType";

const dummyTasks: taskType[] = [
  {
    id: "1",
    name: "Foo",
    category: "3",
    description: "Desc",
    priority: "low",
    isComplete: false,
  },
  {
    id: "2",
    name: "Bar",
    category: "2",
    description: "Description of Bar",
    priority: "high",
    isComplete: true,
  },
  {
    id: "3",
    name: "Baz",
    category: "",
    description: "Description of Baz",
    priority: "medium",
    isComplete: false,
  },
  {
    id: "4",
    name: "Foobar",
    category: "",
    description: "Description of Foobar",
    priority: "none",
    isComplete: false,
  },
  {
    id: "5",
    name: "Qux",
    category: "1",
    description: "Description of Qux",
    priority: "low",
    isComplete: true,
  },
];

export default dummyTasks;
