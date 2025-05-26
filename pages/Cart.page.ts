import { Page } from "playwright";
import { expect } from "playwright/test";
import { selectors } from "../utils/selectors";

export default class CartPage {
    constructor(public page: Page) {

    }

    async verifyTitle(expectedText: string) {
        expect(await this.page.locator(selectors.CartPage.title).innerText()).toBe(expectedText);
    }
    
    async navigateToCart() {
        await this.page.locator(selectors.CartPage.cartLink).click();
    }

    async checkUrlCart(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async checkCartBadge(expectedText: string) {
        const cartBadge = this.page.locator(selectors.CartPage.cartBadge);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(expectedText);
    }

    async checkCartBadgeEmpty() {
        const cartBadge = this.page.locator(selectors.CartPage.cartBadge);
        await expect(cartBadge).toBeHidden();
    }

    getCartItem(productName: string) {
        const cartItem = this.page.locator(selectors.CartPage.cartItem, { hasText: productName });
        return cartItem;
    }

    private getRemoveButton(productName: string) {
        return this.getCartItem(productName).getByRole('button', { name: /Remove/ });
    }

    async checkItemInCartPage(productName: string) {
        const cartItems = this.page.locator(selectors.CartPage.cartItem);
        await expect(cartItems).toHaveCount(1);
        await expect(cartItems.locator(selectors.CartPage.cartItemName)).toHaveText(productName);
    }

    async removeItem(productName: string) {
        const removeBtn = this.getRemoveButton(productName);
        await removeBtn.click();
    }

    async verifyItemNotInCart(productName: string) {
        const productItem = this.getCartItem(productName);
        await expect(productItem).toHaveCount(0);
    }

    async verifyCartEmpty() {
        const cartItems = this.page.locator(selectors.CartPage.cartItem);
        await expect(cartItems).toHaveCount(0);
    }

    get getShoppingCartBadge() {
        return this.page.locator(selectors.CartPage.cartBadge);
    }
}