import { Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly getLogin: Locator;
    readonly getPassword: Locator;
    readonly getLoginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getLogin = page.locator('#user-name')
        this.getPassword = page.locator('#password')
        this.getLoginBtn = page.locator('#login-button')
    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async inputLogin(login: string) {
        await this.getLogin.fill(login);
    }

    async inputPassword(password: string) {
        await this.getPassword.fill(password);
    }

    async clickLoginBtn() {
        await this.getLoginBtn.click();
    }

    async login(login: string, password: string) {
        await this.inputLogin(login);
        await this.inputPassword(password);
        await this.clickLoginBtn();
    }
}
