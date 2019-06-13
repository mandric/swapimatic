import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'swapimatic',
    logo: 'jedi.svg'
  }
});

window.app = app

export default app