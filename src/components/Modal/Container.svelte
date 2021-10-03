<AnimatePresence show={$$props.isOpen} custom={$$props.isOpen}>
  <div
    class={` modalPosition ${
      $$props.isOpen ? 'pointer-events-all' : 'pointer-events-none'
    }`}
  >
    <Motion
      let:motion
      variants={$$props.variants}
      initial={$$props.initial}
      animate={$$props.animate}
      exit={$$props.exit}
      transition={$$props.transition}
      layout
    >
      <div use:motion class="modalContainer">
        <Button
          focusOnLoad
          on:click={handleClose}
          class="bg-transparent relative focus:outline-none p-3 hover:text-purple-700 focus:text-purple-700 text-gray-500"
          id={$$props.buttonId}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', duration: 0.2 }}
          bind:elem={closeBtn}
          tabindex={$$props.isOpen ? 1 : -1}
          preventFocus={!$$props.isOpen}
        >
          <Icon data={xmark} class="w-6 h-6" />
        </Button>
        <Motion let:motion={m2}>
          <div use:m2 class="w-full h-min-content py-2">
            <slot name="header" />
          </div>
        </Motion>
        <Motion let:motion={m3}>
          <div use:m3 class="w-full h-min-content py-2">
            <slot name="body" />
          </div>
        </Motion>
        <Motion let:motion={m4}>
          <div use:m4 class="w-full h-min-content py-2">
            <slot name="footer" />
          </div>
        </Motion>
      </div>
    </Motion>
  </div>
</AnimatePresence>

<script lang="ts">
  export let focusOnView: boolean = false;

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import AnimatePresence from 'svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte';
  import Button from '../Button.svelte';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import xmark from '../../lib/icons/x-mark';
  import { createEventDispatcher } from 'svelte';
  import { focusElem } from '../../lib/stores/focusSelector';

  const dispatch = createEventDispatcher();

  let closeBtn: HTMLButtonElement;

  $: if ($$props.isOpen && closeBtn && focusOnView)
    handleFocus<HTMLButtonElement>(closeBtn);

  async function handleClose({ detail }: CustomEvent) {
    await detail.animate.start({ scale: [1, 0.85, 1] });
    dispatch('close', detail.event);
  }

  async function handleFocus<T extends HTMLElement>(el: T) {
    focusElem.withFocusSelector(el);
    el.focus();
  }

  // initial={{ opacity: 0, scale: 0.7, zIndex: 50 }}
  // animate={{ opacity: 1, scale: 1 }}
  // exit={{ opacity: 0, scale: 0.7 }}
  // transition={{ delay: 0.5 }}
</script>

<style lang="sass">
  .modalPosition
    @apply w-screen h-screen bg-transparent flex items-center justify-center absolute top-0 left-0
    
  .modalContainer
    @apply z-50 w-min-content h-min-content flex flex-col items-end justify-end bg-gray-900 relative p-4 border-2 border-gray-700 rounded shadow-2xl hover:border-gray-500 transition-colors
</style>
