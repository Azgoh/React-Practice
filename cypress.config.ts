import { defineConfig } from "cypress";

const isCI = !!process.env.CI;

export default defineConfig({
  e2e: {
      baseUrl: isCI
      ? "http://localhost:4200"           // CI runs local frontend
      : "https://beasy-13h0.onrender.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
