import './index.scss';
import { App } from './ui/app';

function main() {
  const app = new App(document.body);
  app.update();
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
