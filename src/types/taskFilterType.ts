/*** The type for task filters ***/

type taskFilterType = {
  text: string;
  priority: {
    none: boolean;
    low: boolean;
    medium: boolean;
    high: boolean;
  };
};

export default taskFilterType;
