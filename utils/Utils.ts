import { Page } from "@playwright/test";

export class Utils{

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async loadPage(url : string){
        await this.page.goto(url, {timeout : 30000});
        await this.page.waitForLoadState("networkidle")
    }
}