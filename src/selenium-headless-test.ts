import { Builder, Browser, By } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { saveScreenshot } from './save-screenshot'

export async function getTickerDataFromFundamentusHeadless(ticker: string): Promise<string> {
    const options = new chrome.Options()
    options.addArguments('--headless')
    options.addArguments('--disable-gpu')

    let driver  = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build()

    try {
        console.log('=========== START PROCESS (getTickerDataFromFundamentusHeadless) ================');
        
        console.log('>>>>>>> go to fundamentus');        
        await driver.get('https://www.fundamentus.com.br/')        

        console.log('>>>>>>> getting input element and set ticker code');        
        const input = await driver.findElement(By.xpath('//*[@id="completar"]'))
        await input.sendKeys(ticker)

        console.log('>>>>>>> getting confirm btn a move to details page');        
        const btn = await driver.findElement(By.xpath('/html/body/div[1]/div[1]/form/fieldset/input[2]'))
        await btn.click()

        console.log('>>>>>>> getting ticker price from next page');        
        const priceSpan = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/table[1]/tbody/tr[1]/td[4]/span'))
        const price = await priceSpan.getText()
        console.log('The tiker price is:', price);
        
        console.log('>>>>>>> getting a screenshot from page');
        const screenshot = await driver.takeScreenshot()
        saveScreenshot(screenshot, './src/fundamentus-screen.png')

        console.log('=========== END PROCESS (getTickerDataFromFundamentusHeadless) ================');
        return price
                
    } catch (error: any) {              
        console.log('========= selenium headless error ==========');        
        console.log(error.messsage);
        return ''  
    } finally {
        await driver.quit()
    }
}
