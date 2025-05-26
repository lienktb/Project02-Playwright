import { chromium, expect, FullConfig } from '@playwright/test';
import LoginPage from './pages/Login.page';
import { users } from './data/users';
import ProductsPage from './pages/Products.page';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);
    
    await page.goto('https://www.saucedemo.com/');

    
    await loginPage.fillAccount(users.standard.username, users.standard.password);
    await loginPage.clickButtonLogin();

    // await loginPage.expectSucess("/inventory.html");

    const productsPage = new ProductsPage(page);
    await productsPage.verifyTitle("Products");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await page.context().storageState({ path: 'storageState.json' });

    await browser.close();
}

export default globalSetup;
