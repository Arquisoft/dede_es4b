import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {


  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('Usuario inicia sesión correctamente', ({ given, when, then }) => {

    let email: string;
    let username: string;

    given('Un usuario sin login', () => {
      email = "prueba2@prueba2.com"
      username = "prueba2"
    });

    when('Rellena el formulario correctamente', async () => {
      await expect(page).toMatch('Inicie sesión')

      await expect(page).toFillForm('form', {
        email: email,
        password: username,
      })
      await expect(page).toClick('button', { text: 'Continuar' })
    });

    then('Se le muestra el catálogo', async () => {
      await expect(page).toMatch('Catálogo de productos')
    });
  })


  test('Usuario inicia sesión sin cuenta', ({ given, when, then }) => {

    let email: string;
    let username: string;

    given('Un usuario sin login', () => {
      email = "prueba1@prueba1.com"
      username = "prueba1"
    });

    when('Rellena el formulario incorrectamente', async () => {
      await expect(page).toMatch('Inicie sesión')

      await expect(page).toFillForm('form', {
        email: email,
        password: username,
      })
      await expect(page).toClick('button', { text: 'Continuar' })
    });

    then('Le aparece un error', async () => {
      await expect(page).toMatch('No existe el usuario. Vuelva a intentarlo')
    });
  })


  afterEach(async () => {
    browser.close()
  })

});

