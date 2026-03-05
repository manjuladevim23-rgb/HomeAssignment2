import test, { expect } from "@playwright/test"
//for setting environment 
import dotenv from 'dotenv'
const Value=process.env.EnvFile||"CreateLead_LoginQA"||"SF_LoginDev"
dotenv.config({path:`Helper/${Value}.env`})

///  $env:envFile="CreateLead_LoginQA"--- for setting environment file to QA we need to run the envfile in terminal
//for extracting data from csv
import { parse } from 'csv-parse/sync'
import fs from 'fs'

//from json file
import Editdata from  "../../Helper/EditLead.json"

const readValue:any[]=parse(fs.readFileSync("Helper/CreateLead.csv"),{
    columns:true,
    skip_empty_lines:true
})

for(let createLead of readValue){
 for(let editlead of Editdata) {  

test(`CreateLead using parmeterization  ${createLead.testId}`,async({page})=>{

 let url=process.env.CreateLead_Url as string
 let user=process.env.CreateLead_Username as string
 let pass=process.env.CreateLead_Password as string

await page.goto(url)
await page.locator("#username").fill(user)
await page.locator("#password").fill(pass)
await page.getByRole("button",{name:'Login'}).click()
await page.locator(`text='CRM/SFA'`).click()
await page.getByRole("link",{name:'Leads'}).click()
await page.locator("//a[text()='Create Lead']").click()
await page.locator("//input[@id='createLeadForm_companyName']").fill(createLead.companyName)
await page.locator("//input[@id='createLeadForm_firstName']").fill(createLead.firstName)
await page.locator("//input[@id='createLeadForm_lastName']").fill(createLead.lastName)
await page.locator("//input[@name='submitButton']").click()
const text = page.locator(`//div[text()='View Lead']`)
expect(text).toHaveText("View Lead")
await page.locator("//a[text()='Edit']").click()
await page.waitForLoadState('domcontentloaded')
await page.locator("//input[@id='updateLeadForm_companyName']").fill(editlead.companyName)
await page.locator("//input[@id='updateLeadForm_firstName']").fill(editlead.firstName)
await page.locator("//input[@id='updateLeadForm_lastName']").fill(editlead.lastName)
await page.getByRole('button',{name:"Update"}).click()

}

)}}