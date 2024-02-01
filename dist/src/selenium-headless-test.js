"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTickerDataFromFundamentusHeadless = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const save_screenshot_1 = require("./save-screenshot");
function getTickerDataFromFundamentusHeadless(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = new chrome_1.default.Options();
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        let driver = yield new selenium_webdriver_1.Builder()
            .forBrowser(selenium_webdriver_1.Browser.CHROME)
            .setChromeOptions(options)
            .build();
        try {
            console.log('=========== START PROCESS (getTickerDataFromFundamentusHeadless) ================');
            console.log('>>>>>>> go to fundamentus');
            yield driver.get('https://www.fundamentus.com.br/');
            console.log('>>>>>>> getting input element and set ticker code');
            const input = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="completar"]'));
            yield input.sendKeys(ticker);
            console.log('>>>>>>> getting confirm btn a move to details page');
            const btn = yield driver.findElement(selenium_webdriver_1.By.xpath('/html/body/div[1]/div[1]/form/fieldset/input[2]'));
            yield btn.click();
            console.log('>>>>>>> getting ticker price from next page');
            const priceSpan = yield driver.findElement(selenium_webdriver_1.By.xpath('/html/body/div[1]/div[2]/table[1]/tbody/tr[1]/td[4]/span'));
            const price = yield priceSpan.getText();
            console.log('The tiker price is:', price);
            console.log('>>>>>>> getting a screenshot from page');
            const screenshot = yield driver.takeScreenshot();
            (0, save_screenshot_1.saveScreenshot)(screenshot, './src/fundamentus-screen.png');
            console.log('=========== END PROCESS (getTickerDataFromFundamentusHeadless) ================');
            return price;
        }
        catch (error) {
            console.log('========= selenium headless error ==========');
            console.log(error.messsage);
            return '';
        }
        finally {
            yield driver.quit();
        }
    });
}
exports.getTickerDataFromFundamentusHeadless = getTickerDataFromFundamentusHeadless;
//# sourceMappingURL=selenium-headless-test.js.map