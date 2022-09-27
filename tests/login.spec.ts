import { expect, test } from "@playwright/test";
import { InventoryPage } from "../pageObjects/inventoryPage";
import { LoginPage } from "../pageObjects/loginPage";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
});

test("Login with valid credentials", async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  // Act
  await (
    await (
      await loginPage.inputLogin("standard_user")
    ).inputPassword("secret_sauce")
  ).clickLoginBtn();
  //Assert
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.shouldBeTitle("Products");
});

test("Login with invalid credentials", async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  // Act
  await (
    await (await loginPage.inputLogin("xxx")).inputPassword("xxx")
  ).clickLoginBtn();
  //Assert
  await loginPage.getErrorMessage(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
