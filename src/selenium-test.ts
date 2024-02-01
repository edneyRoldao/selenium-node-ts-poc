import {Builder, Browser, By, Key, until} from 'selenium-webdriver'
import { sleep } from './sleep'

export async function getTickerDataFromFundamentus(ticker: string): Promise<void> {
    let driver  = await new Builder().forBrowser(Browser.CHROME).build()

    try {
        console.log('=========== START PROCESS (getTickerDataFromFundamentus) ================');
        
        // go to fundamentus
        await driver.get('https://www.fundamentus.com.br/')        
        await sleep(3000)

        // getting input element and set ticker code
        const input = await driver.findElement(By.xpath('//*[@id="completar"]'))
        await input.sendKeys(ticker)
        await sleep(3000)

        // getting confirm btn a move to details page
        const btn = await driver.findElement(By.xpath('/html/body/div[1]/div[1]/form/fieldset/input[2]'))
        await btn.click()

        // getting ticker price from next page
        const priceSpan = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/table[1]/tbody/tr[1]/td[4]/span'))
        const price = await priceSpan.getText()
        console.log('The tiker price is:', price);
                        
        await sleep(5000)
        console.log('=========== END PROCESS (getTickerDataFromFundamentus) ================');
        
        
    } catch (error: any) {              
        console.log('========= selenium headless error ==========');        
        console.log(error.messsage);        
    } finally {
        await driver.quit()
    }
}
