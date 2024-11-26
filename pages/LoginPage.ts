import { Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInputBox: Locator;
    readonly passwordInputBox: Locator;
    readonly loginButton : Locator;
    readonly brandNameHeader: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.usernameInputBox = this.page.getByPlaceholder("Username");
    this.passwordInputBox = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", {name : "Login"});
    this.brandNameHeader = this.page.locator(".login_logo");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInputBox.fill(username);
    await this.passwordInputBox.fill(password);
    await this.loginButton.click();
}

async validateBranding() : Promise<void>{
    expect(this.brandNameHeader).toHaveText("Swag Labs")
}

}