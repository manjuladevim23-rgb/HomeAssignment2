import test, { expect } from '@playwright/test'
import path from 'path'
import * as fs from 'fs';


test("FileUpload usig Event listner file chooser",async({page})=>
{
page.goto("https://the-internet.herokuapp.com/upload")

 //step1 :Establish the Event which we are expecting to happen
 const chooser= page.waitForEvent('filechooser',{ timeout: 5000})

 //step2 :trigger the event using click 

 page.locator("//div[@id='drag-drop-upload']").click()

//step 3 resolve the promise by catching the event 

const catchEvent = await chooser

//stey 4 inject the file from the directory 

await catchEvent.setFiles(path.join(__dirname, '../UploadFiles/Mul2.jpg'))

await page.waitForTimeout(5000)
await expect(page.locator("(//div[@class='dz-filename'])[1]")).toHaveText(/Mul2.*/)


})

test.only("File Download ", async({page})=>
{
await page.goto("https://the-internet.herokuapp.com/download")


 //step1 :Establish the Event which we are expecting to happen
 const downloadEvent = page.waitForEvent('download',{timeout:10000})

 //trigeer the event using click 

 await page.getByRole("link",{name:'random_data.txt'}).click()

// resolve the promise
 const temp = await downloadEvent
//extract file from the response 
//temp.suggested filename

//const filePath = await temp.saveAs(path.join(__dirname,'../UploadFiles/' +temp.suggestedFilename()))
//await temp.saveAs(filePath)

const fileName = temp.suggestedFilename();
const filePath = path.join(__dirname, '../UploadFiles/', fileName);
//const filePath = path.join(__dirname, '../UploadFiles/test.txt');

await temp.saveAs(filePath);


  //  Assertion 1: Check file exists at expected path
  expect(fs.existsSync(filePath)).toBeTruthy();

}
)

