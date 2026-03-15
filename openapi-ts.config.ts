import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  // input: "https://tuffani-pizza-backend-production.up.railway.app/docs-json",
  input: "http://localhost:8000/docs-json",
  output: "src/client",
  plugins: ["@hey-api/client-axios"],
});
