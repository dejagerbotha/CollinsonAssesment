const { setWorldConstructor } = require('@cucumber/cucumber');
const ApiClient = require('./api_openMeteo');

class CustomWorld {
  constructor() {
    this.apiClient = new ApiClient();
  }
}

setWorldConstructor(CustomWorld);