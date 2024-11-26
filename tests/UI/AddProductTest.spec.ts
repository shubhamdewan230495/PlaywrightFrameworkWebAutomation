import { test, expect, Page} from '@playwright/test';
import userCredsData from "../../testdata/userCreds.json"
import { LoginPage } from '../../pages/LoginPage';
import {Utils} from '../../utils/Utils'
import {configData} from "../../config/configData"
import {ProductPage} from "../../pages/ProductPage"
import {CartPage} from '../../pages/CartPage'
import {CheckoutPage} from '../../pages/CheckoutPage'

let page : Page;
let loginPage : LoginPage;
let utils : Utils;
let productPage : ProductPage;
let cartPage : CartPage;
let checkoutPage : CheckoutPage;

test.beforeEach(async ({context})=>{
    page = await context.newPage();
    loginPage = new LoginPage(page);
    utils = new Utils(page);
    productPage = new ProductPage(page, context);
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page);
})

for(let data of userCredsData.valid){
    test(`Valid Login with username - ${data.username}`, async () => {
        await utils.loadPage(configData.appUrl);
        await loginPage.validateBranding()
        await loginPage.login(data.username, data.password)
        await productPage.waitForProductPage()
    });
}

test('Add to Cart functionality',async ()=>{
    const productName : string = "Sauce Labs Fleece Jacket";
    await utils.loadPage(configData.appUrl);
    await loginPage.validateBranding()
    await loginPage.login(userCredsData.valid[0].username, userCredsData.valid[0].password)
    await productPage.waitForProductPage()
    const flag : boolean = await productPage.openMyCartIfNotEmpty()
    if(flag){
        await cartPage.removeAllProducts()
        await cartPage.clickContinueShopping()
    }
    await productPage.addProductByName(productName)
    await productPage.openMyCartIfNotEmpty()
    await cartPage.verifyCartItem(productName)
})

test('Verify social media icons',async ()=>{
    const productName : string = "Sauce Labs Fleece Jacket";
    await utils.loadPage(configData.appUrl);
    await loginPage.validateBranding()
    await loginPage.login(userCredsData.valid[0].username, userCredsData.valid[0].password)
    await productPage.waitForProductPage()
    await productPage.validateSocialMediaIcons()
})

test('Checkout functionality',async ()=>{
    const productName : string = "Sauce Labs Fleece Jacket";
    await utils.loadPage(configData.appUrl);
    await loginPage.validateBranding()
    await loginPage.login(userCredsData.valid[0].username, userCredsData.valid[0].password)
    await productPage.waitForProductPage()
    const flag : boolean = await productPage.openMyCartIfNotEmpty()
    if(flag){
        await cartPage.removeAllProducts()
        await cartPage.clickContinueShopping()
    }
    await productPage.addProductByName(productName)
    await productPage.openMyCartIfNotEmpty()
    await cartPage.verifyCartItem(productName)
    await cartPage.clickCheckoutButton()
    await checkoutPage.fillCheckoutFormAndContinue()
})