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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTickerDataFromFundamentus = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const sleep_1 = require("./sleep");
function getTickerDataFromFundamentus(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        let driver = yield new selenium_webdriver_1.Builder().forBrowser(selenium_webdriver_1.Browser.CHROME).build();
        try {
            console.log('=========== START PROCESS (getTickerDataFromFundamentus) ================');
            // go to fundamentus
            yield driver.get('https://www.fundamentus.com.br/');
            yield (0, sleep_1.sleep)(3000);
            // getting input element and set ticker code
            const input = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="completar"]'));
            yield input.sendKeys(ticker);
            yield (0, sleep_1.sleep)(3000);
            // getting confirm btn a move to details page
            const btn = yield driver.findElement(selenium_webdriver_1.By.xpath('/html/body/div[1]/div[1]/form/fieldset/input[2]'));
            yield btn.click();
            // getting ticker price from next page
            const priceSpan = yield driver.findElement(selenium_webdriver_1.By.xpath('/html/body/div[1]/div[2]/table[1]/tbody/tr[1]/td[4]/span'));
            const price = yield priceSpan.getText();
            console.log('The tiker price is:', price);
            yield (0, sleep_1.sleep)(5000);
            console.log('=========== END PROCESS (getTickerDataFromFundamentus) ================');
        }
        catch (error) {
            console.log('========= selenium headless error ==========');
            console.log(error.messsage);
        }
        finally {
            yield driver.quit();
        }
    });
}
exports.getTickerDataFromFundamentus = getTickerDataFromFundamentus;
//# sourceMappingURL=selenium-test.js.map