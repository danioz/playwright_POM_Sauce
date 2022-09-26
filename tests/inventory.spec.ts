import {expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { InventoryPage } from '../pageObjects/inventoryPage'

test.describe.configure({mode: 'parallel'});

test.beforeEach(async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.inputLogin('standard_user')
    await loginPage.inputPassword('secret_sauce')
    await loginPage.clickLoginBtn();
})

test('shouldBePresentOneItemInTheCartAfterAddedItem', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);
    // Act
    await inventoryPage.addFirstItem();
    //Assert
    await inventoryPage.shouldBeItemsInCart(1);
});

test('shouldBePresentTwoItemsInTheCartAfterAddedItems', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);
    // Act
    await inventoryPage.addItemsToCart(3);
    // Assert
    await inventoryPage.shouldBeItemsInCart(3);
});





