import { Page, Locator, expect} from '@playwright/test';
import { Context } from 'vm';

export class ProductPage {
    readonly page: Page;
    readonly context: Context;
    readonly productHeading: Locator;  
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productCard: Locator;
    readonly twitterLink: Locator;
    readonly facebookLink: Locator;
    readonly linkedinLink: Locator;

  constructor(page: Page, context: Context) {
    this.context = context;
    this.page = page;
    this.productHeading = this.page.locator(".title:has-text('Products')");
    this.shoppingCartLink = this.page.locator(".shopping_cart_link");
    this.shoppingCartBadge = this.page.locator(".shopping_cart_badge");
    this.productCard = this.page.locator(".inventory_item_description");
    this.twitterLink = this.page.locator('a[data-test="social-twitter"]')
    this.linkedinLink = this.page.locator('a:has-text("LinkedIn")')
    this.facebookLink = this.page.locator('a:has-text("Facebook")')
  }

  async waitForProductPage() : Promise<void>{
    await this.productHeading.waitFor()
  }

  async openMyCartIfNotEmpty() : Promise<boolean>{
    if(await this.shoppingCartBadge.isVisible()){
      await this.shoppingCartLink.click()
      return true;
    }
    return false;
  }

  async addProductByName(productName : string) : Promise<void>{
    await (await this.productCard.filter({hasText: productName}).getByRole("button", {name : "Add to cart"})).click()
  }

  async validateSocialMediaIcons() : Promise<void>{
    const [newPageTwitter] = await Promise.all([
      this.context.waitForEvent('page'),
      this.twitterLink.click(),
    ]);
    await newPageTwitter.waitForLoadState();
    expect(await newPageTwitter.url()).toBe("https://x.com/saucelabs")
    await newPageTwitter.close()

    const [newPageLinkedin] = await Promise.all([
      this.context.waitForEvent('page'),
      this.linkedinLink.click(),
    ]);
    await newPageLinkedin.waitForLoadState();
    expect(await newPageLinkedin.url()).toBe("https://www.linkedin.com/company/sauce-labs/")
    await newPageLinkedin.close()

    const [newPageFacebook] = await Promise.all([
      this.context.waitForEvent('page'),
      this.facebookLink.click(),
    ]);
    await newPageFacebook.waitForLoadState();
    expect(await newPageFacebook.url()).toBe("https://www.facebook.com/saucelabs")
    await newPageFacebook.close()
} 
}