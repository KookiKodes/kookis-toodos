<script lang="ts">
  export let focusOnLoad: boolean = false;
  export let animate: boolean | AnimationControls | VariantLabels | TargetAndTransition = useAnimation();

  import { Motion, useAnimation } from "svelte-motion";
  import type {AnimationControls, VariantLabels, TargetAndTransition} from "svelte-motion";
  import { createEventDispatcher } from "svelte";
  import FocusSelector from "./FocusSelector.svelte";
  import focusStore from "../lib/stores/focusSelector";
  import { onMount } from "svelte/internal";

  const [_, setFocusElem] = focusStore;

  const dispatch = createEventDispatcher();

  const triggerClick = (event: Event) => {
    dispatch("click", {event, animate});
  };

  function handleFocus(event: Event) {
    setFocusElem(event.target as HTMLElement);
    dispatch("focus", event)
  }

  function initFocus(el) {
    if (focusOnLoad) {
      el.focus();
      setFocusElem(el);
    }
  }

  onMount(() => {
    dispatch("load", animate)
  })
</script>

<Motion
  let:motion
  {animate}
  initial={$$props.initial}
  whileHover={$$props.whileHover}
  transition={$$props.transition}
>
  <button
    use:motion
    use:initFocus
    id={$$props.id}
    type={$$props.type}
    class={$$props.class}
    data-type={$$props.dataType}
    on:click={triggerClick}
    on:focus={handleFocus}
    ><slot />
    <FocusSelector name={$$props.id} />
  </button>
</Motion>

<style lang="postcss">
  button[data-type="outline"] { 
    @apply flex items-center justify-center text-2xl text-purple-600 relative font-light border px-5 py-1 rounded border-purple-500 focus:bg-purple-700 focus:ring-1 focus:ring-blue-300 focus:text-gray-900 focus:border-gray-900 focus:shadow-md hover:shadow-lg focus:outline-none;
  }

  button[data-type="default"] { 
    @apply flex items-center justify-center text-2xl text-gray-300 bg-purple-700 relative font-light border px-5 py-1 rounded border-purple-500 focus:ring-1 focus:ring-blue-300 focus:bg-purple-700 focus:text-gray-200 bg-gradient-to-r focus:from-purple-700 focus:to-purple-600 focus:border-gray-900 hover:shadow-lg focus:shadow-md focus:outline-none;
  }
</style>
