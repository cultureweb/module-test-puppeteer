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
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Polr - Campus Annecy")
    }, timeout);

    //parcours client avec sign up
    test('home and Sign Up', async () => {
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        // on attent que l'élément ".title" soit chargé
      // attendre que l'élément <body> soit chargé
      await page.waitForSelector('body');
      // récupérer le contenu de l'élément <body>
      const html = await page.$eval('body', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("Register");
    }, timeout);

     // champs Rgegister a remplir
      test('Sign Up an  Register', async () => {
        await page.from( document.querySelectorAll( 'imput name'))
        await page.waitForSelector('username');
        await page.type('text','gerard')
        await page.screenshot({path: './tests/img/create-account/username.png'});

        await page.from( document.querySelectorAll( 'imput name'))
        await page.waitForSelector('password');
        await page.type('password','123')
        await page.screenshot({path: './tests/img/create-account/password.png'});

        await page.from( document.querySelectorAll( 'imput name'))
        await page.waitForSelector('email');
        await page.type('email','gerard@123.fr')
        await page.screenshot({path: './tests/img/create-account/email.png'});

        await page.waitForSelector('#btn btn-default btn-success');

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
