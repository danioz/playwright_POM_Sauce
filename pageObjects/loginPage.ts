import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { InventoryPage } from "./inventoryPage";

export class LoginPage extends BasePage {
  readonly getLoginInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getLoginBtn: Locator;
  readonly getErrorMsg: Locator;
  readonly getErrorClose: Locator;
  readonly url = "https://www.saucedemo.com/";

  constructor(page: Page) {
    super(page);
    this.getLoginInput = page.locator("#user-name");
    this.getPasswordInput = page.locator("#password");
    this.getLoginBtn = page.locator("#login-button");
    this.getErrorMsg = page.locator("[data-test='error']");
    this.getErrorClose = page.locator("button.error-button");
  }

  async goTo(): Promise<LoginPage> {
    await super.navigate(this.url);
    return this;
  }

  async inputLogin(login: string): Promise<LoginPage> {
    await this.getLoginInput.waitFor({ state: "visible" });
    await this.getLoginInput.fill(login);
    return this;
  }

  async inputPassword(password: string): Promise<LoginPage> {
    await this.getPasswordInput.fill(password);
    return this;
  }

  async clickLoginBtn(): Promise<LoginPage> {
    await this.getLoginBtn.click();
    return this;
  }

  async getErrorMessage(expectedText: string) {
    await this.getLoginInput.waitFor({ state: "visible" });
    await expect(this.getErrorMsg).toContainText(expectedText);
  }

  async closeErrorMessage(): Promise<void> {
    await this.getLoginInput.waitFor({ state: "visible" });
    await this.getErrorClose.click();
  }

  async loginAs(login: string, password: string): Promise<InventoryPage> {
    await this.inputLogin(login);
    await this.inputPassword(password);
    await this.clickLoginBtn();
    return new InventoryPage(super.page);
  }
}
