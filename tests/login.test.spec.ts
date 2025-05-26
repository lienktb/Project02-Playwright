import test, { expect } from "playwright/test";
import LoginPage from "../pages/Login.page";
import { users } from "../data/users";
import ProductsPage from "../pages/Products.page";

test.describe("Login Feature", async () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        loginPage = new LoginPage(page);
        await page.goto(`${baseURL}`);
    })

    test("Positive: Standard user login with correct", async ({ page }) => {
        await loginPage.fillAccount(users.standard.username, users.standard.password);
        await loginPage.clickButtonLogin();

        await loginPage.expectSucess("/inventory.html");
        
        const productsPage = new ProductsPage(page);
        await productsPage.verifyTitle("Products");
    })

    test("Positive: Problem user login with correct", async ({ page }) => {
        await loginPage.fillAccount(users.problem.username, users.problem.password);
        await loginPage.clickButtonLogin();

        await loginPage.expectSucess("/inventory.html");
        
        const productsPage = new ProductsPage(page);
        await productsPage.verifyTitle("Products");
    })

    test("Positive: Performance user login with correct", async ({ page }) => {
        await loginPage.fillAccount(users.performance.username, users.performance.password);
        await loginPage.clickButtonLogin();

        await loginPage.expectSucess("/inventory.html");
        
        const productsPage = new ProductsPage(page);
        await productsPage.verifyTitle("Products");
    })

    test("Negative: Locked out user login with incorrect", async ({ page }) => {
        await loginPage.fillAccount(users.locked.username, users.locked.password);
        await loginPage.clickButtonLogin();
        
        await loginPage.expectError("Epic sadface: Sorry, this user has been locked out.");
    })

    test("Negative: User login without username and password", async ({ page }) => {
        await loginPage.fillAccount("", "");
        await loginPage.clickButtonLogin();
        
        await loginPage.expectError("Epic sadface: Username is required");
    })

    test("Negative: User login without username", async ({ page }) => {
        await loginPage.fillAccount("", users.standard.password);
        await loginPage.clickButtonLogin();
        
        await loginPage.expectError("Epic sadface: Username is required");
    })

    test("Negative: User login without password", async ({ page }) => {
        await loginPage.fillAccount(users.standard.username, "");
        await loginPage.clickButtonLogin();
        
        await loginPage.expectError("Epic sadface: Password is required");
    })

    test("Negative: User login with password incorrect", async ({ page }) => {
        await loginPage.fillAccount(users.error.username, users.error.password);
        await loginPage.clickButtonLogin();
        
        await loginPage.expectError("Epic sadface: Username and password do not match any user in this service");
    })
})