export const titleAsUrl = title => {
  return title.toLowerCase().replace(/ /g, "-");
};

export const editPostTimestamp = t => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const date = new Date(t * 1000);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const setComponent = () => {
  let componentName = window.location.pathname;
  if (componentName.includes("/post/")) {
    componentName = "PostView";
  } else if (componentName.includes("/category/")) {
    componentName = "CategoryView";
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

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};
