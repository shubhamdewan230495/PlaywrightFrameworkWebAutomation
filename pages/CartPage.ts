import { Page, Locator, expect} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly removeButton : Locator
    readonly continueShopping : Locator
    readonly firstAddedProduct : Locator;
    readonly checkoutButton : Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = this.page.getByRole("button", {name : "Remove"});
    this.continueShopping = this.page.getByRole("button", {name : "Continue Shopping"});
    this.firstAddedProduct = this.page.locator(".inventory_item_name");
    this.checkoutButton = this.page.getByRole("button",{name : "Checkout"})
  }

  async removeAllProducts() : Promise<void>{
    for(let counter=await this.removeButton.count()-1; counter>=0;counter--){
      await this.removeButton.nth(counter).click()
    }
  }

  async clickContinueShopping() : Promise<void>{
    await this.continueShopping.click()
  }

  async verifyCartItem(itemName : string) : Promise<void>{
    expect(this.firstAddedProduct).toHaveText(itemName)
  }

  async clickCheckoutButton() : Promise<void>{
    await this.checkoutButton.click()
  }
}