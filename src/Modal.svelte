<script>
  import { createEventDispatcher } from 'svelte'
  export let logo = 'default.svg'
  const dispatch = createEventDispatcher()
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    min-height: 220px;
    overflow: auto;
    transform: translate(-50%,-50%);
    padding: 1em;
    border-radius: 0.2em;
    background-position: center;
    background-size: 200px 200px;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 1);
  }

  button {
    //display: block;
    display: none;
    margin: 0 auto;
    text-align: center;
  }

</style>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal' style='background-image:url({logo});'>
  <slot name='header'></slot>
  <slot></slot>
  <button on:click='{() => dispatch("close")}'>close modal</button>
</div>
