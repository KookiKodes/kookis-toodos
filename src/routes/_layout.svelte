<AnimateSharedLayout type="crossfade" children>
  <Nav
    {segment}
    on:click={() => {
      modalView.on();
    }}
  />

  <main
    class="bg-gray-900 min-w-screen min-h-screen h-min-content flex flex-col items-center justify-start relative overflow-hidden"
  >
    <slot />
  </main>
</AnimateSharedLayout>

<script lang="ts">
  export let segment: string;

  import { AnimateSharedLayout } from 'svelte-motion';
  import Nav from '../components/Nav.svelte';
  import { modalView } from '../lib/stores/modalView';
</script>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
