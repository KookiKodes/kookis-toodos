<Motion let:motion>
  <div
    use:motion
    on:mouseenter={() => modifier.toggle('hover')}
    on:mouseleave={() => modifier.toggle('hover')}
    class="input-container"
    data-state={$modifier}
  >
    <div class="flex items-center justify-center flex-1 min-h-50 h-11 relative">
      {#if leftIcon}
        <IconBox type={leftIcon} {id} state={$modifier} class="left-icon" />
      {/if}
      <input
        {type}
        {id}
        {name}
        {placeholder}
        on:focus={handleFocus}
        on:blur={() => modifier.toggle('focus')}
        tabindex={1}
      />
      {#if rightIcon}
        <IconBox type={rightIcon} {id} />
      {/if}
    </div>
    {#if !preventFocus}
      <FocusSelector name={id} />
    {/if}
  </div>
</Motion>

<script lang="ts">
  export let preventFocus: boolean = false;
  export let leftIcon: IconTypes | undefined = undefined;
  export let rightIcon: IconTypes | undefined = undefined;
  export let type: 'email' | 'text' | 'password' | 'submit' = 'text';
  export let id: string = 'input';
  export let name: string = 'Input';
  export let placeholder: string = 'Type in me';

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import IconBox from '../utils/IconBox.svelte';
  import FocusSelector from '../../FocusSelector.svelte';
  import colors from 'tailwindcss/colors';
  import { focusElem } from '../../../lib/stores/focusSelector';
  import type { IconTypes, Modifiers } from '../utils/interfaces/InputTypes';
  import { useComponentState } from '../../../lib/stores/componentState';

  const modifier = useComponentState<Modifiers>('default', [
    'hover',
    'focus',
    'disabled',
  ]);

  function handleFocus(e: Event) {
    modifier.toggle('focus');
    focusElem.withFocusSelector(e.target as HTMLInputElement);
  }
</script>

<style lang="sass">
  input 
    @apply h-full px-2 flex relative min-h-full flex-auto bg-transparent placeholder-gray-500 text-2xl focus:outline-none font-light focus:placeholder-gray-100 transition-colors

  .input-container 
    @apply flex flex-col h-min-content w-full max-w-400 max-h-50 rounded bg-gray-800 ring-2 ring-gray-700 my-10 hover:shadow-xl text-gray-500 transition-all relative transition-shadow transition-colors
    
    &[data-state="hover"]
      @apply shadow-lg ring-gray-500 text-gray-400

    &[data-state="focus"]
      @apply shadow-md ring-purple-700 text-gray-400
</style>
