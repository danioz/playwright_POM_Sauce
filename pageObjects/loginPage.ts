import {Locator, Page} from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly getLoginInput: Locator;
    readonly getPasswordInput: Locator;
    readonly getLoginBtn: Locator;
    readonly getErrorMsg: Locator;
    readonly getErrorClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getLoginInput = page.locator("#user-name");
        this.getPasswordInput = page.locator("#password");
        this.getLoginBtn = page.locator("#login-button");
        this.getErrorMsg = page.locator("[data-test='error']")
        this.getErrorClose = page.locator("button.error-button");
    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async inputLogin(login: string) {
        await this.getLoginInput.fill(login);
    }

    async inputPassword(password: string) {
        await this.getPasswordInput.fill(password);
    }

    async clickLoginBtn() {
        await this.getLoginBtn.click();
    }

    async getErrorMessage() {
        return await this.getErrorMsg.allInnerTexts();
    }

    async closeErrorMessage() {
        await this.getErrorClose.click();
    }

    async loginAs(login: string, password: string) {
        await this.inputLogin(login);
        await this.inputPassword(password);
        await this.clickLoginBtn();
    }
}
