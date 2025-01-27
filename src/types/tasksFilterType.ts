/*** The type for task filters ***/

type tasksFilterType = {
  text: string;
  priority: {
    none: boolean;
    low: boolean;
    medium: boolean;
    high: boolean;
  };
};

export default tasksFilterType;
