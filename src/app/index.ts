import { App } from './ui/app';
import i18n from './locales';

let app: App;

function main() {
  void i18n.changeLanguage('en');

  app = new App(document.body);
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
