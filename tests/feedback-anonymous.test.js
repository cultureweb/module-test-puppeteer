const timeout = 15000;

// test d'un feedback
describe("Feedback Anonymous", () => {
    let page;

    // vérification d'un feedback réussi
    test('feedback with success response', async () => {
        await page.goto('http://polr.web-74.com');

        await page.waitForSelector('#doorbell-button');
        await page.$eval( '#doorbell-button', el => el.click() );

        await page.waitForSelector('#doorbell', {visible: true});
        await page.type('#doorbell-feedback', 'Ceci est un message pour un test');
        await page.type('#doorbell-email', 'test@test.fr');
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback11.png'});

        await page.$eval( '#doorbell-submit-button', el => el.click() );
        const textButton = await page.$eval('#doorbell-submit-button', el => el.textContent);
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback12.png'});
        expect(textButton).toBe("Sending...");

        await page.waitForSelector('#doorbell-success', {visible: true});
        const successAlert = await page.$eval('#doorbell-success', el => el.textContent);
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback13.png'});
        expect(successAlert).toBe("Feedback sent!");

        await page.waitForSelector('#doorbell-container', {visible: false});
    }, timeout);

    // vérification d'un feedback avec mauvaise adresse email
    test('feedback bad email', async () => {
        await page.goto('http://polr.web-74.com');

        await page.waitForSelector('#doorbell-button');
        await page.$eval( '#doorbell-button', el => el.click() );

        await page.waitForSelector('#doorbell', {visible: true});
        await page.type('#doorbell-feedback', 'Ceci est un message pour un test');
        await page.type('#doorbell-email', 'test@test');
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback21.png'});

        await page.$eval( '#doorbell-submit-button', el => el.click() );
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback22.png'});

        await page.waitForSelector('#doorbell-error', {visible: true});
        const errorAlertEmail = await page.$eval('#doorbell-error', el => el.textContent);
        await page.screenshot({path: './tests/img/feedback-anonymous/feedback23.png'});
        expect(errorAlertEmail).toBe("Invalid email address");

    }, timeout);

    // vérification d'un feedback sans message
    // test('feedback without message', async () => {
    //     await page.goto('http://polr.web-74.com');
    //
    //     await page.waitForSelector('#doorbell-button');
    //     await page.$eval( '#doorbell-button', el => el.click() );
    //
    //     await page.waitForSelector('#doorbell', {visible: true});
    //     await page.type('#doorbell-email', 'test@test.fr');
    //     await page.screenshot({path: './tests/img/feedback-anonymous/feedback31.png'});
    //
    //     await page.$eval( '#doorbell-submit-button', el => el.click() );
    //     await page.screenshot({path: './tests/img/feedback-anonymous/feedback32.png'});
    //
    //     await page.waitForSelector('#doorbell-error', {visible: true});
    //     const errorAlertMsg = await page.$eval('#doorbell-error', el => el.textContent);
    //     await page.screenshot({path: './tests/img/feedback-anonymous/feedback33.png'});
    //     expect(errorAlertMsg).toBe("Your message is required");
    //
    // }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
