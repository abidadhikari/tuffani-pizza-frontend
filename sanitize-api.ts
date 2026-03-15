import fs from "fs";
import path from "path";

const TARGET_FILES = [
  path.join(__dirname, "src/client-services/client.gen.ts"),
  path.join(__dirname, "src/client-services/types.gen.ts"),
  path.join(__dirname, "src/client-services/sdk.gen.ts"),
];

const SEARCH_PATTERN =
  /https:\/\/tuffani-pizza-backend-production\.up\.railway\.app/g;
const REPLACEMENT = "";

function sanitize() {
  TARGET_FILES.forEach((filePath) => {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`Skipping: ${path.basename(filePath)} (File not found)`);
        return;
      }

      const originalContent = fs.readFileSync(filePath, "utf8");

      if (!SEARCH_PATTERN.test(originalContent)) {
        console.log(`No URL found in: ${path.basename(filePath)}`);
        return;
      }

      // Replace all instances of the URL
      const updatedContent = originalContent.replace(
        SEARCH_PATTERN,
        REPLACEMENT,
      );

      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`Success: Sanitized ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`Error during sanitization of ${filePath}:`, error);
    }
  });
}

sanitize();
