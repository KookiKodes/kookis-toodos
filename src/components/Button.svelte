<Motion
  let:motion
  {animate}
  variants={$$props.variants}
  initial={$$props.initial}
  whileHover={$$props.whileHover}
  transition={$$props.transition}
  exit={$$props.exit}
>
  <button
    use:motion
    id={$$props.id}
    type={$$props.type}
    class={$$props.class}
    data-type={$$props.dataType}
    on:click={triggerClick}
    on:focus={handleFocus}
    bind:this={elem}
    tabindex={$$props.tabindex}
    ><slot />
    {#if !preventFocus}
      <FocusSelector name={$$props.id} />
    {/if}
  </button>
</Motion>

<script lang="ts">
  export let preventFocus: boolean = false;
  export let elem: HTMLButtonElement | null = null;
  export let focusOnLoad: boolean = false;
  export let animate:
    | boolean
    | AnimationControls
    | VariantLabels
    | TargetAndTransition = useAnimation();

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import { useAnimation } from 'svelte-motion';
  import type {
    AnimationControls,
    VariantLabels,
    TargetAndTransition,
  } from 'svelte-motion';
  import { createEventDispatcher } from 'svelte';
  import FocusSelector from './FocusSelector.svelte';
  import { focusElem } from '../lib/stores/focusSelector';
  import { onMount } from 'svelte/internal';

  const dispatch = createEventDispatcher();

  const triggerClick = (event: Event) => {
    dispatch('click', { event, animate });
  };

  function handleFocus(event: Event) {
    if (!preventFocus) {
      focusElem.withFocusSelector(event.target as HTMLElement);
    }
    dispatch('focus', event);
  }

  function delay(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  }

  async function initFocus(el) {
    if (focusOnLoad) {
      focusElem.withFocusSelector(el);
      await delay(5);
      el.focus();
    }
  }

  onMount(() => {
    if (elem) initFocus(elem);
    dispatch('load', animate);
  });
</script>

<style lang="sass">
  .btn-outline
    @apply flex items-center text-2xl relative font-light border px-5 py-1 rounded focus:ring-1 focus:ring-blue-300 focus:outline-none focus:shadow-md hover:shadow-lg text-purple-600 border-purple-500 focus:bg-purple-700 focus:text-gray-900 focus:border-gray-900 transition-colors 

  .btn-default
    @apply flex items-center text-2xl relative font-light border px-5 py-1 rounded focus:ring-1 focus:ring-blue-300 focus:outline-none focus:shadow-md hover:shadow-lg text-gray-300 bg-purple-700 border-purple-500 focus:bg-purple-700 focus:text-gray-200 focus:bg-gradient-to-r focus:from-purple-800 focus:to-purple-600 focus:border-gray-900 transition-colors
    
  .btn-submit
    @apply flex items-center w-full justify-between relative transition-colors rounded py-1 focus:outline-none focus:shadow-md hover:shadow-lg border-2
    @apply text-2xl text-gray-400 font-normal focus:text-gray-200 border-gray-700 focus:border-purple-900
    @apply from-gray-800 to-gray-800 hover:from-purple-700 hover:to-purple-900 bg-gradient-to-br focus:from-purple-700 focus:to-purple-900

</style>
