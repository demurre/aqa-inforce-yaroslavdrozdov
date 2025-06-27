const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    baseUrl: "https://automationintesting.online/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
