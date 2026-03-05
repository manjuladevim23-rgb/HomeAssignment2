import test, { expect } from '@playwright/test'
import { url } from 'node:inspector'

test("Frames and alerts",async({page})=>{



page.on('dialog',async(alertType)=>{
 const message= alertType.message()
 console.log(message)

 const type = alertType.type()
 console.log(type)

alertType.accept()

})

await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm")
const frame = page.frameLocator("#iframeResult")
await frame.locator("//button[text()='Try it']").click()


const text = frame.locator("//p[contains(text(),'You pressed OK!')]")
//expect(page.locator("//p[contains(text(),'You pressed OK!')]"))

expect(text).toHaveText("You pressed OK!")




})


