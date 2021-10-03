<AnimatePresence show={$$props.isOpen}>
  <Button
    on:click={handleClose}
    class={`w-full h-screen absolute top-0 left-0 z-40 focus:outline-none ${
      $$props.isOpen ? 'pointer-events-all' : 'pointer-events-none'
    }`}
    id={$$props.id}
    variants={$$props.variants}
    animate={$$props.animate}
    initial={$$props.initial}
    exit={$$props.exit}
    transition={$$props.transition}
    tabindex={$$props.isOpen ? 1 : -1}
    preventFocus={!$$props.isOpen}
  />
</AnimatePresence>

<script lang="ts">
  import Button from '../Button.svelte';
  import AnimatePresence from 'svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClose({ detail }: CustomEvent) {
    if ($$props.isOpen) {
      dispatch('close', detail.event);
    }
  }
</script>
