import { Locator, Page, expect } from '@playwright/test'

export class InventoryPage {
    readonly page: Page;
    readonly getCartIcon: Locator;
    readonly getItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getCartIcon = page.locator('.shopping_cart_badge');
        this.getItem = page.locator("[data-test^='add-to-cart']");
    }

    async addFirstItem() {
        await this.getItem.first().click();
    }

    async addItemsToCart(number) {
        for (let i = 0; i <= number - 1; i++) {
            await this.addFirstItem()
        }
    }

    async shouldBeItemsInCart(number) {
        return expect(this.getCartIcon).toHaveText(number.toString())
    }
}
