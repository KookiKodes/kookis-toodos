{#if $focusElem !== null && $focusElem.id === name}
  <Motion
    let:motion
    layoutId="focus-selector"
    {variants}
    initial="from"
    animate="to"
  >
    <div
      use:motion
      class="absolute w-full h-full top-0 right-0 box-content ring-2 ring-blue-400 opacity-80 rounded pointer-events-none bg-blue-400 bg-opacity-10 z-50"
    />
  </Motion>
{/if}

<script lang="ts">
  export let name: string = '';

  import { Motion } from 'svelte-motion';
  import { focusElem } from '../lib/stores/focusSelector';
  import variants from '../lib/variants/focusSelectorVariant';
</script>
