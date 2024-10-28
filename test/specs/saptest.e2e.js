import BasePage from "../../common.js"
const Base = new BasePage();
describe("Validation of sap", ()=>{
    before(async()=>{
        await browser.url(global.wdioEnvParameters.config.baseUrl);
        await browser.maximizeWindow();
    })
    it("Open SAP", async()=> {
        await Base.waitForDisplayedAndSetValue($("//input[@title='User']"),"GCHEWALW")
        await Base.waitForDisplayedAndSetValue($("//input[@title='Password']"),"Ganesh@2744")
        await Base.waitForDisplayedAndClick($("//button[@title='Log On']"))
        await browser.pause(50000)
        //await Base.switchToIframe($("//iframe[@id='__WL44B57NPY4P7GRL0ZEUROIA-frm']"))
        await Base.waitForDisplayedAndClick($("//button[@title='Close Lightbox']"))
        await browser.pause(15000)
        await Base.waitForDisplayedAndClick($("//a[@title='Search Open Search']"))
        await browser.pause(15000)
        await Base.waitForDisplayedAndSetValue($("//div[@title='Search']//input"),"Create Task")
        await browser.pause(15000)
        await Base.waitForDisplayedAndClick($("//*[@class='sapMText sapUiSelectable sapMTextNoWrap sapMTextMaxWidth suggestText suggestNavItem suggestListItemCell']"))
        await browser.pause(15000)
        
    })
})
