<Button
  class="btn-submit"
  tabindex="1"
  id={$$props.id}
  {preventFocus}
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ type: 'spring', duration: 0.2 }}
  on:click={handleClick}
  type="submit"
>
  <IconBox type={iconLeft} class="text-transparent self-start" />
  <slot />
  <IconBox type={iconRight} class="self-end" />
</Button>

<script lang="ts">
  export let preventFocus: boolean = false;
  export let iconLeft: IconTypes | undefined = undefined;
  export let iconRight: IconTypes | undefined = undefined;

  import IconBox from '../utils/IconBox.svelte';
  import Button from '../../Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { IconTypes } from '../utils/interfaces/InputTypes';

  const dispatch = createEventDispatcher();

  function handleClick({ detail: { animate, event } }: CustomEvent) {
    animate.start({ scale: [1, 0.85, 1] });
    dispatch('click', event);
  }
</script>

<style lang="sass">

</style>
