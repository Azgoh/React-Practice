import { defineConfig } from "cypress";

const isCI = true; // Set to true for CI environment, false for local development

export default defineConfig({
  e2e: {
    baseUrl: isCI ? "http://localhost:4200" : "https://beasy-13h0.onrender.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
