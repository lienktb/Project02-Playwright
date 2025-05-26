import { Page } from "playwright";
import { expect } from "playwright/test";
import { selectors } from "../utils/selectors";

export default class LoginPage {
    constructor(public page: Page) {

    }

    async fillAccount(username: string, password: string) {
        await this.page.fill(selectors.LoginPage.username, username);
        await this.page.fill(selectors.LoginPage.password, password);
    }

    async clickButtonLogin() {
        await this.page.click(selectors.LoginPage.loginButton);
    }

    async expectSucess(url: string) {
        await this.page.waitForURL(url);
    }

    async expectError(expectedMessage: string) {
        const errorMessage = await this.page.locator(selectors.LoginPage.errorMessage).innerText();
        expect(errorMessage).toBe(expectedMessage);
    }
}