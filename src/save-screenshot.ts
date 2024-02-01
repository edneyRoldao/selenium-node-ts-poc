import fs from 'fs'

export function saveScreenshot(screenshot: any, path: string): void {
    try {
        fs.writeFileSync(path, screenshot, 'base64')
    } catch (error: any) {
        console.log('There was an error while try to save screenshot ->', error.message)
    }
}