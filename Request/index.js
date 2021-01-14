const request = require("axios");

class Request {
  async getHtmlPage(url) {
    const { data, status } = await request(url);
    const isStatusOk = this.handleStatus(status);

    return isStatusOk ? data : null;
  }

  handleStatus(status) {
    let isStatusSuccess = false;

    if(status === 200) {
      isStatusSuccess = true;
    } else {
      console.log(`Something went wrong with status: ${status}`);
    }

    return isStatusSuccess;
  }
}

module.exports = Request;