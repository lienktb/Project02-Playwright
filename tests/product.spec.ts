import test, { expect } from "playwright/test";
import LoginPage from "../pages/Login.page";
import ProductsPage from "../pages/Products.page";
import { users } from "../data/users";
import { isSortedAZ, isSortedHighToLow, isSortedLowToHigh, isSortedZA } from "../utils/filter";

test.describe("Product Feature - Filter", () => {
    let productsPage: ProductsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await page.goto(`${baseURL}`);  
        
        await loginPage.fillAccount(users.standard.username, users.standard.password);
        await loginPage.clickButtonLogin();

        await loginPage.expectSucess("/inventory.html");
        
        await productsPage.verifyTitle("Products");
    })

    test("Filter - Name A to Z", async ({ page, baseURL }) => {
        await page.locator('.product_sort_container').selectOption('za');
        await page.locator('.product_sort_container').selectOption('az');

        const productNameList = await productsPage.getAllProductName();
        expect(isSortedAZ(productNameList)).toBeTruthy();
    })

    test("Filter - Name Z to A", async ({ page, baseURL }) => {
        await page.locator('.product_sort_container').selectOption('za');

        const productNameList = await productsPage.getAllProductName();
        expect(isSortedZA(productNameList)).toBeTruthy();
    })

    test("Filter - Price Low to High", async ({ page, baseURL }) => {
        await page.locator('.product_sort_container').selectOption('lohi');

        const productPriceList = await productsPage.getAllProductPrice();
        expect(isSortedLowToHigh(productPriceList)).toEqual(productPriceList);
    })

    test("Filter - Price High to Low", async ({ page, baseURL }) => {
        await page.locator('.product_sort_container').selectOption('hilo');

        const productPriceList = await productsPage.getAllProductPrice();
        expect(isSortedHighToLow(productPriceList)).toEqual(productPriceList);
    })
})