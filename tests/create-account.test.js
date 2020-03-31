const timeout = 15000;

// série de tests sur la creation d'un compte utilisateur
describe("Tests basiques", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.web-74.com');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({ path: './tests/img/create-account-basic-home.png' });
        expect(html).toContain("Polr - Campus Annecy")
    }, timeout);

    //parcours client avec sign up
    // test('home and Sign Up', async () => {
    //     await page.goto('http://polr.web-74.com');
    //     await page.waitForSelector('#navbar li a');
    //     // click sur le lien "Sign Up" de la navigation
    //     await page.evaluate(() => {
    //         Array
    //             .from(document.querySelectorAll('#navbar li a'))
    //             .filter(el => el.textContent === 'Sign Up')[0].click();
    //     });
    //     // attendre que l'élément <body> soit chargé
    //     await page.waitForSelector('body');
    //     // récupérer le contenu de l'élément <body>
    //     const html = await page.$eval('body', e => e.innerHTML);
    //     // on vérifie qu'il contient la bonne chaîne de caractères
    //     await page.screenshot({ path: './tests/img/create-account-signUp.png' });
    //     expect(html).toContain("Register");
    // }, timeout);

    // champs Rgegister a remplir
    // test('Sign Up and Register', async () => {
    //     await page.goto('http://polr.web-74.com/signup');
    //     await page.waitForSelector('body');

    //     await page.type(".container input[name='username']", 'xavier');
    //     await page.type(".container input[name='password']", 'test3');
    //     await page.type(".container input[name='email']", 'xavier@gmail.com');

    //     await page.screenshot({ path: './tests/img/create-account-3fiels.png' });

    //     // click sur le button "register" de la navigation
    //     await page.waitForSelector('input[value="Register"]');
    //     await page.$eval('input[value="Register"]', el => el.click());

    //     await page.waitForSelector(".login-submit");

    //     const html = await page.$eval('body h1', e => e.innerHTML);
    //     await page.screenshot({ path: './tests/img/create-account-signIn.png' });
    //     expect(html).toBe("Login");

    // }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
