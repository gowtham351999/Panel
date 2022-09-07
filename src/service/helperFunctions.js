//add Query
export const addQuery = (dataObject, apiObject) => {
  if (!dataObject) {
    return "";
  }

  const keys = [
    "page",
    "pageNo",
    "size",
    "search",
    "pageLimit",
    "sort",
    "retailerId",
  ];

  keys.map((key) => {
    if (dataObject.hasOwnProperty(key) && typeof dataObject[key] != "object") {
      if (apiObject.query.hasOwnProperty(key)) {
        apiObject.addQuery = { key, payload: dataObject[key] };
      }
    } else {
      dataObject[key] &&
        Object.keys(dataObject[key]).map((keyName) => {
          if (apiObject.query.hasOwnProperty(keyName)) {
            apiObject.addQuery = {
              key: keyName,
              payload: dataObject[key][keyName],
            };
          }
        });
    }
  });
};

//generate Query
export const generateQuery = (query) => {
  let url = "";

  if (query.hasOwnProperty("url_id")) {
    url = `/${query.url_id}`;
  }

  return (
    url +
    Object.keys(query).reduce((accumulator, key, index) => {
      if (
        query[key] === "" ||
        query[key] == null ||
        key === "url_id" ||
        (query[key] !== null && query[key].toString().trim() === "")
      ) {
        return accumulator;
      } else {
        return accumulator + `${index !== 0 ? "&" : "?"}${key}=${query[key]}`;
      }
    }, "")
  );
};

//get s.no
export const getSNo = (page = 1, limit, index) => {
  return parseInt((page - 1) * limit) + index + 1;
};

//get User Details
export const getUserDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem("adminDetails"));
  return userDetails;
};

//get Short Data
export const getShortData = (data, charLength) => {
  if (data) {
    if (data.length < charLength) {
      return data;
    } else {
      let detail = data.substring(0, charLength - 1) + "...";
      return detail;
    }
  }
};
