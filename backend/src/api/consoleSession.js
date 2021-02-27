const { opensim_address, region_user, region_pass } = require("../config");
const axios = require("axios");
const qs = require("qs");
const xml = require("xml");

class ConsoleSession {
  constructor(port) {
    console.log("ConsoleSession at port " + port + " created");
    this.port = port;
    this.address = opensim_address;
    axios({
      method: "post",
      url: this.getFullAddress() + "/StartSession/",
      data: qs.stringify({
        USER: region_user,
        PASS: region_pass,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((response) => {
        const { data } = response;
        this.consoleID = data
          .toString()
          .substring(
            data.lastIndexOf("<SessionID>") + 11,
            data.lastIndexOf("</SessionID>")
          );
        console.log(this.port, this.consoleID);
      })
      .catch((e) => {
        console.log("Something really fucked up: " + e);
        this.consoleID = e;
      });
  }

  getFullAddress() {
    return "http://" + this.address + ":" + this.port;
  }

  async closeConsole() {
    try {
      await axios({
        method: "post",
        url: this.getFullAddress() + "/CloseSession/",
        data: qs.stringify({
          USER: region_user,
          PASS: region_pass,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).finally(() => {
        console.log("Connection closed session at port: " + this.port);
      });
    } catch (e) {
      console.log(e.message);
      console.log("Error closing session at port: " + this.port);
    }
  }
}

module.exports = ConsoleSession;
