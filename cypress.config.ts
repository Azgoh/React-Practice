import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://beasy-13h0.onrender.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
