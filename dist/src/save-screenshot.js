"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScreenshot = void 0;
const fs_1 = __importDefault(require("fs"));
function saveScreenshot(screenshot, path) {
    try {
        fs_1.default.writeFileSync(path, screenshot, 'base64');
    }
    catch (error) {
        console.log('There was an error while try to save screenshot ->', error.message);
    }
}
exports.saveScreenshot = saveScreenshot;
//# sourceMappingURL=save-screenshot.js.map