export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const addEllipsis = (str, lim) => {
  return str.length > lim ? str.substr(0, lim) + "..." : str;
};
