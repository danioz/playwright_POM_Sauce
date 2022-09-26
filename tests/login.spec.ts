import {test} from '@playwright/test';
import {LoginPage} from '../pageObjects/loginPage';

test.describe.configure({mode: 'parallel'});


let page;
let loginPage = new LoginPage(page);
test.beforeEach(async ({ page}) => {
    await loginPage.goTo();
})

test('xxx', async ({page}) => {
    // Arrange
    // Act
    await loginPage.inputLogin("");
    await loginPage.inputPassword("");
    await loginPage.clickLoginBtn();
    //Assert
    await loginPage.getErrorMessage();
});







