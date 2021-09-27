<script lang="ts">
  export let name: string = "";

  import { Motion } from "svelte-motion";
  import focusState from "../lib/stores/focusSelector";
  import variants from "../lib/variants/focusSelectorVariant";

  const [focusedElem, _] = focusState;
</script>

{#if $focusedElem !== null && $focusedElem.id === name}
  <Motion
    let:motion
    layoutId="focus-selector"
    {variants}
    initial="from"
    animate="to"
  >
    <div
      use:motion
      class="absolute w-full h-full top-0 right-0 box-content ring-2 ring-blue-400 opacity-80 rounded pointer-events-none bg-blue-400 bg-opacity-10"
    />
  </Motion>
{/if}
