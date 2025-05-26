import { Page } from "playwright";
import { expect } from "playwright/test";
import { selectors } from "../utils/selectors";

export default class ProductPage {
    constructor(public page: Page) { }

    async verifyProductName(productName: string) {
        expect(await this.page.locator(selectors.ProductPage.productName).innerText()).toBe(productName);
    }

    async addToCart() {
        await this.page.locator(selectors.ProductPage.addToCartButton).click();
    }

    async verifyAddToCartButtonShowed() {
        await expect(this.page.locator(selectors.ProductPage.addToCartButton)).toBeVisible();
    }

    async verifyAddToCartButtonHidden() {
        await expect(this.page.locator(selectors.ProductPage.addToCartButton)).toBeHidden();
    }

    async verifyRemoveButton() {
        const removeBtn = this.page.locator(selectors.ProductPage.removeButton);
        await expect(removeBtn).toBeVisible();
    }

    async verifyAddedToCart() {
        await this.verifyAddToCartButtonHidden();
        await this.verifyRemoveButton();
    }

     async removeCart() {
        await this.page.locator(selectors.ProductPage.removeButton).click();
    }
}