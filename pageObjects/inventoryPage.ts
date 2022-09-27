import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class InventoryPage extends BasePage {
  readonly getCartIcon: Locator;
  readonly getItem: Locator;
  readonly getTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.getCartIcon = page.locator(".shopping_cart_badge");
    this.getItem = page.locator("[data-test^='add-to-cart']");
    this.getTitle = page.locator(".title");
  }

  async addFirstItem(): Promise<void> {
    await this.getItem.first().click();
  }

  async addItemsToCart(numberOfItems: number): Promise<void> {
    for (let i = 0; i <= numberOfItems - 1; i++) {
      await this.addFirstItem();
    }
  }

  async shouldBeItemsInCart(numberOfItems: number) {
    return await expect(this.getCartIcon).toHaveText(numberOfItems.toString());
  }

  async shouldBeTitle(expectedTitle: string) {
    return await expect(this.getTitle).toHaveText(expectedTitle);
  }
}
