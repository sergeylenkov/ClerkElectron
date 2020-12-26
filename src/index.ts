import './index.scss';
import { App } from './ui/app';

function main() {
  console.log('Yoo');
  const app = new App();
  app.render(document.body);
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
