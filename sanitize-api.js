"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var TARGET_FILES = [
    path_1.default.join(__dirname, "src/client-services/client.gen.ts"),
    path_1.default.join(__dirname, "src/client-services/types.gen.ts"),
    path_1.default.join(__dirname, "src/client-services/sdk.gen.ts"),
];
var SEARCH_PATTERN = /https:\/\/tuffani-pizza-backend-production\.up\.railway\.app/g;
var REPLACEMENT = "";
function sanitize() {
    TARGET_FILES.forEach(function (filePath) {
        try {
            if (!fs_1.default.existsSync(filePath)) {
                console.log("Skipping: ".concat(path_1.default.basename(filePath), " (File not found)"));
                return;
            }
            var originalContent = fs_1.default.readFileSync(filePath, "utf8");
            if (!SEARCH_PATTERN.test(originalContent)) {
                console.log("No URL found in: ".concat(path_1.default.basename(filePath)));
                return;
            }
            // Replace all instances of the URL
            var updatedContent = originalContent.replace(SEARCH_PATTERN, REPLACEMENT);
            fs_1.default.writeFileSync(filePath, updatedContent, "utf8");
            console.log("Success: Sanitized ".concat(path_1.default.basename(filePath)));
        }
        catch (error) {
            console.error("Error during sanitization of ".concat(filePath, ":"), error);
        }
    });
}
sanitize();
