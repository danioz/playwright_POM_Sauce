import { test } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage";
import { InventoryPage } from "../pageObjects/inventoryPage";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginAs("standard_user", "secret_sauce");
});

test("shouldBePresentOneItemInTheCartAfterAddedItem", async ({ page }) => {
  // Arrange
  const inventoryPage = new InventoryPage(page);
  // Act
  await inventoryPage.addFirstItem();
  //Assert
  await inventoryPage.shouldBeItemsInCart(1);
});

test("shouldBePresentTwoItemsInTheCartAfterAddedItems", async ({ page }) => {
  // Arrange
  const inventoryPage = new InventoryPage(page);
  // Act
  await inventoryPage.addItemsToCart(2);
  // Assert
  await inventoryPage.shouldBeItemsInCart(2);
});
