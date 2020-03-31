const timeout = 15000;

// test d'un raccourcisseur d'URL avec URL personnalisée
describe("Shorten anonymous with option", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('shorten with option', async () => {
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('.long-link-input');
        await page.type('.long-link-input', 'https://www.google.com/search?ei=7wmDXpyKLMGAae7NjtAL&q=test&oq=test&gs_lcp=CgZwc3ktYWIQAzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIFCAAQgwEyBQgAEIMBMgIIADICCAAyBQgAEIMBMgIIADoECAAQRzoOCAAQ6gIQtAIQmgEQ5QJQ-KNyWIzkcmCPh3NoCXABeACAAVKIAYkDkgEBNZgBAKABAaoBB2d3cy13aXqwAQY&sclient=psy-ab&ved=0ahUKEwjcvfjyr8ToAhVBQBoKHe6mA7oQ4dUDCAs&uact=5');
        await page.screenshot({path: './tests/img/shortenOption1.png'});

        await page.waitForSelector('#show-link-options');
        await page.$eval( '#show-link-options', el => el.click() );
        await page.type('.custom-url-field', 'test');

        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('input.result-box');
        const val = await page.$eval('input.result-box', el => el.value);
        expect(val).toMatch(/^http:\/\/polr\.web-74\.com\/test+/);

        await page.screenshot({path: './tests/img/shortenOption2.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
