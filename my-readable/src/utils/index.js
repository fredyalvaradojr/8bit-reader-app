export const titleAsUrl = title => {
  return title.toLowerCase().replace(/ /g, "-");
};

export const setComponent = () => {
  let componentName = window.location.pathname;
  if (componentName.includes("/post/")) {
    componentName = "PostView";
  }
  console.debug(componentName);
  return componentName;
};

export const getUniquePostID = () => {
  let token = localStorage.token;
  if (!token)
    token = localStorage.token = Math.random()
      .toString(36)
      .substr(-8);
  return token;
};

export const getTimeStamp = () => {
  return Math.floor(Date().getTime() / 1000);
};
