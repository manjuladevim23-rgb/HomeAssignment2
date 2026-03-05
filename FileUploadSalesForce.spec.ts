import test, { expect } from "@playwright/test"
import path from "path"

test("SalesForceFileUpload",async({page})=>
{

await page.goto("https://login.salesforce.com/")

 await page.locator("#username").fill("dilipkumar.rajendran@testleaf.com")
 await page.locator('[id="password"]').fill('TestLeaf@2025')
 await page.locator('input[type="submit"]').click()
 await page.waitForLoadState("domcontentloaded")
 await page.locator(".slds-r5").click()
  await page.getByLabel("View All Applications").scrollIntoViewIfNeeded()
 await page.getByLabel("View All Applications").click()
 await page.getByPlaceholder("Search apps or items...").fill("Accounts")
 await page.locator("//mark[text()='Accounts']").click()
  await page.getByRole('button',{name:'New'}).click()
  await page.getByRole('textbox',{name:'Account Name'}).fill("Test123")
  await page.getByRole('combobox',{name:'Type'}).click()
  await page.getByText('Prospect').click()
  await page.getByRole('combobox',{name:'Industry'}).click()
  await page.getByText("Banking").click()
  await page.locator("//button[@name='SaveEdit']").click()

  //const text =  page.locator("//span[contains(text(),'created')]")
 await expect(page.locator('.toastMessage.slds-text-heading--small.forceActionsText')).toBeVisible()
 await expect(page.locator("//lightning-formatted-text[@slot='primaryField']")).toBeVisible()

 //File upload
   const choose =page.locator("//span[contains(text(),'Upload Files')]")
 
   // step 2 : Indentify the File path from the project directory, enclose
     //           filename and filetype
 
        const filepath = path.join(__dirname, '../UploadFiles/Mul1.jpg')

        choose.setInputFiles(filepath)
        expect(page.getByRole('heading',{name:'Upload Files'})).toBeVisible()
        await page.locator("//span[text()='Done']").click()
        await expect(page.locator(`(//span[contains(text(),'Mul1')])[2]`)).toContainText("Mul1")
        
        await page.waitForTimeout(2000)

 


}
)



