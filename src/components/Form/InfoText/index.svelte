<a href={$$props.href}>
  <button
    id={$$props.id}
    on:click={handleClick}
    on:focus={handleFocus}
    tabindex={1}
    class="group"
  >
    Don't have an account?
    <br />
    <span class="group-hover:underline group-focus:underline">Sign Up</span>
    <FocusSelector name={$$props.id} />
  </button>
</a>

<script lang="ts">
  import FocusSelector from '../../FocusSelector.svelte';
  import { focusElem } from '../../../lib/stores/focusSelector';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleFocus(e: Event) {
    const target = e.target as HTMLAnchorElement;
    focusElem.withFocusSelector(target);
  }

  function handleClick(event: Event) {
    dispatch('click', event);
    focusElem.withFocusSelector(event.target);
    event.target.focus();
  }
</script>

<style lang="sass">
  a
    @apply w-full flex items-center justify-center flex-col text-purple-300 relative cursor-pointer
  button
    @apply focus:outline-none relative 
  span
    @apply text-purple-500
</style>
