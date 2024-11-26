import { Page, Locator, expect} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput : Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.getByPlaceholder("First Name")
    this.lastNameInput = this.page.getByPlaceholder("Last Name")
    this.zipCodeInput = this.page.getByPlaceholder("Zip/Postal Code")
    this.continueButton = this.page.getByRole("button", {name : "Continue"})
    this.finishButton = this.page.getByRole("button", {name : "Finish"})
  }

  async fillCheckoutFormAndContinue(): Promise<void>{
    await this.firstNameInput.fill("sample")
    await this.lastNameInput.fill("testing")
    await this.zipCodeInput.fill("201301")
    await this.continueButton.click()
    await this.finishButton.click()
  }

}