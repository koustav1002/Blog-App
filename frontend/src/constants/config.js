// API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "loading...",
    message: "Data is being loaded, please wait",
  },
  success: {
    title: "Success",
    message: "Data is loaded successfully",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching the response from the server, please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message: "Please check internet connectivity, unable to connect to server",
  },
};

//API SERVICE CALL
//Sample Request
//Need Service call : {url, method, params: true/ false, query : true/false}

export const SERVICE_URLs = {
  userSignup: { url: "/signup", method: "POST" },
};
