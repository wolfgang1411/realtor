import axios from "axios";

export const Server = {
  get: function (url: string) {
    return new Promise(function (resolve, reject) {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      axios
        .get(url, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: function (url: string, data: any) {
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(url, data);
  },
};
