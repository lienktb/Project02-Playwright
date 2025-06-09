import { Page } from "playwright";
import { expect } from "playwright/test";
import { selectors } from "../utils/selectors";

export default class ProductsPage {
    constructor(public page: Page) { }

    async verifyTitle(expectedText: string) {
        expect(await this.page.locator(selectors.ProductsPage.title).innerText()).toBe(expectedText);
    }

    getProductItem(productName: string) {
        const productItem = this.page.locator(selectors.ProductsPage.productItem, { hasText: productName });
        return productItem;
    }

    async getAllProductName() {
        const productList = await this.page.locator(selectors.ProductsPage.productItem).all();
        const productNameList = await Promise.all(productList.map(async (productItem) => {
            return await productItem.locator(selectors.ProductsPage.productItemName).innerText();
        }))

        return productNameList;
    }

    async getAllProductPrice() {
        const productList = await this.page.locator(selectors.ProductsPage.productItem).all();
        const productPriceList = await Promise.all(productList.map(async (productItem) => {
            const priceText = await productItem.locator(selectors.ProductsPage.productItemPrice).innerText();
            return parseFloat(priceText.replace("$", ""));
        }))

        console.log(productPriceList);
        return productPriceList;
    }

    async clickProductItemLink(productName: string) {
        const productLink = this.page.locator(selectors.ProductsPage.productItemLink, { hasText: productName });
        await productLink.click();
    }

    private getAddToCartButton(productName: string) {
        return this.getProductItem(productName).getByRole('button', { name: /Add to cart/ });
    }

    private getRemoveButton(productName: string) {
        return this.getProductItem(productName).getByRole('button', { name: /Remove/ });
    }

    async addToCart(productName: string) {
        const addToCartBtn = this.getAddToCartButton(productName);

        await addToCartBtn.click();
        await expect(addToCartBtn).toBeHidden();

        const removeBtn = this.getRemoveButton(productName);
        await expect(removeBtn).toBeVisible();
    }

    async removeCart(productName: string) {
        const removeBtn = this.getRemoveButton(productName);
        await expect(removeBtn).toBeVisible();
        await removeBtn.click();
    }

    async verifyAddToCartButton(productName: string) {
        const addToCartBtn = this.getAddToCartButton(productName);
        await expect(addToCartBtn).toBeVisible();
    }
}