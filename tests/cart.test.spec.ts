import test from "playwright/test";
import CartPage from "../pages/Cart.page";
import ProductPage from "../pages/Product.page";
import ProductsPage from "../pages/Products.page";
import LoginPage from "../pages/Login.page";
import { users } from "../data/users";

test.describe("Cart Feature", async () => {
    let cartPage: CartPage;
    let productsPage: ProductsPage;
    let productPage: ProductPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);
        productsPage = new ProductsPage(page);

        await page.goto(`${baseURL}`);  
        
        await loginPage.fillAccount(users.standard.username, users.standard.password);
        await loginPage.clickButtonLogin();

        await loginPage.expectSucess("/inventory.html");
        
        await productsPage.verifyTitle("Products");
    })

    test("Positive: Standard user add 1 product to the cart.", async ({ page }) => {
        await productsPage.addToCart("Sauce Labs Backpack");

        await cartPage.checkCartBadge("1");

        await cartPage.navigateToCart();
        await cartPage.checkUrlCart("/cart.html");

        await cartPage.checkItemInCartPage("Sauce Labs Backpack");

    })

    test("Positive: Standard user add 1 product to the cart and remove.", async ({ page }) => {
        await productsPage.addToCart("Sauce Labs Backpack");
        
        await cartPage.checkCartBadge("1");

        await productsPage.removeCart("Sauce Labs Backpack");
        await productsPage.verifyAddToCartButton("Sauce Labs Backpack");
    })

     test("Positive: Standard user add 1 product to the cart and remove from cart page", async ({ page }) => {
        await productsPage.addToCart("Sauce Labs Backpack");
        
        await cartPage.checkCartBadge("1");

        await cartPage.navigateToCart();
        await cartPage.checkUrlCart("/cart.html");

        await cartPage.checkItemInCartPage("Sauce Labs Backpack");

        await cartPage.removeItem("Sauce Labs Backpack");
        await cartPage.verifyItemNotInCart("Sauce Labs Backpack");
    })

    test("Positive: Standard user add 2 products to the cart", async ({ page }) => {
        await productsPage.addToCart("Sauce Labs Backpack");
        
        await cartPage.checkCartBadge("1");

        await productsPage.addToCart("Sauce Labs Bike Light");
        await cartPage.checkCartBadge("2");
    })

    test("Positive: Standard user add 1 products to the cart from product page", async ({ page }) => {
        await productsPage.clickProductItemLink("Sauce Labs Backpack");
        await productPage.addToCart();
        
        await productPage.verifyAddedToCart();

        await cartPage.checkCartBadge("1");
    })

    test("Positive: Standard user add 1 products to the cart from product page and remove", async ({ page }) => {
        await productsPage.clickProductItemLink("Sauce Labs Backpack");
        await productPage.addToCart();
        
        await productPage.verifyAddedToCart();
        await cartPage.checkCartBadge("1");

        await productPage.removeCart();

        await productPage.verifyAddToCartButtonShowed();
        await cartPage.checkCartBadgeEmpty();
    })

    test("Positive: Standard user add 1 products to the cart from product page and remove from cart page", async ({ page }) => {
        await productsPage.clickProductItemLink("Sauce Labs Backpack");
        await productPage.addToCart();
        
        await productPage.verifyAddedToCart();
        await cartPage.checkCartBadge("1");

        await cartPage.navigateToCart();
        await cartPage.checkUrlCart("/cart.html");

        await cartPage.checkItemInCartPage("Sauce Labs Backpack");

        await cartPage.removeItem("Sauce Labs Backpack");
        await cartPage.verifyItemNotInCart("Sauce Labs Backpack");
    })
})