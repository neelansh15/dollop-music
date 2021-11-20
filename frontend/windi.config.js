import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  extract: {
    include: ["**/*.{jsx,tsx,css}"],
    exclude: ["node_modules", ".git", ".next"],
  },
});
