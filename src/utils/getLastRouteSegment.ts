// Given a route (e.g. /Todo-App/add-task), return the
// last route segment (e.g. return 'add-task')
const getLastRouteSegment = (route: string) => {
  const routeSplit = route.split("/");
  return routeSplit[routeSplit.length - 1];
};

export default getLastRouteSegment;
