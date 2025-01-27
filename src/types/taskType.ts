// The type for a task
type taskType = {
  id: string;
  name: string;
  category: string; // Points to the id of a category, or "" for no category
  description: string;
  priority: "none" | "low" | "medium" | "high"; // 1 is lowest priority, 3 is highest priority
  isComplete: boolean;
};

export default taskType;
