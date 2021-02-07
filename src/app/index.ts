import { App } from './ui/app';
import i18n from './locales';

function main() {
  void i18n.changeLanguage('en');

  const app = new App(document.body);
  app.update();
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
