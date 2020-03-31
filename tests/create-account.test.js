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
    test('home and Sign Up', async () => {
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        // on attent que l'élément ".title" soit chargé
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        await page.screenshot({ path: './tests/img/create-account-signUp.png' });
        expect(html).toContain("Register");
    }, timeout);

    // champs Rgegister a remplir
    test('Sign Up and Register', async () => {
        await page.goto('http://polr.web-74.com/signup');
        await page.waitForSelector('body');
        
        await page.type("input[name='username']", 'gerard');
        await page.screenshot({ path: './tests/img/create-account-1fiels.png' });
        await page.type("input[name='password']", '123');

        await page.type("input[name='email']", 'gerard@test.fr');
        await page.screenshot({ path: './tests/img/create-account-3fiels.png' });

        // click sur le lien "About" de la navigation
        await page.waitForSelector('.btn-success');
        await page.$eval('.btn-success', el => el.click());
        // const html = page.$eval('body', e => e.innerHTML);
        // await page.screenshot({ path: './tests/img/create-account-signIn.png' });
        // console.log({ html })
        // expect(html).toContain("Login");

        // const val = await page.$eval('input.result-box', el => el.value);
        // expect(val).toMatch(/^http:\/\/polr\.web-74\.com\/[0-9]+/);
        // await page.screenshot({path: './tests/img/shorten2.png'});

        // await page.goto('http://polr.web-74.com');

        // await page.waitForSelector('#navbar li a');
        // // click sur le lien "Sign Up" de la navigation
        // await page.evaluate( () => {
        //     Array
        //         .from( document.querySelectorAll( '#navbar li a' ) )
        //         .filter( el => el.textContent === 'Sign Up' )[0].click();
        // });
        // // on attent que l'élément ".title" soit chargé
        // await page.waitForSelector('.title');
        // // on récupère le code HTML
        // const html = await page.$eval('.title', e => e.innerHTML);
        // // on vérifie qu'il contient la bonne chaîne de caractères
        // expect(html).toContain("Register");
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
