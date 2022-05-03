import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/carrito.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/productos", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Usuario añade producto al carrito', ({given,when,then}) => {
    

    given('Un usuario en los detalles de un producto', async () => {
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toClick("#productos > div:nth-child(2)");
    });

    when('Añade producto al carrito', async () => {
      await expect(page).toClick('button', { text: 'Añadir a carrito' })
    });

    then('El carrito tiene  un producto más', async () => {
      await page.goto("http://localhost:3000/carrito")

      await expect(page).toMatch("Gafas Natación Arena")
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

});

