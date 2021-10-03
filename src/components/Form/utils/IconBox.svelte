<Motion let:motion transition={{ duration: 0.2 }}>
  <label use:motion for={$$props.id} class={$$props.class} data-state={state}>
    <Icon
      data={data[$$props.type]}
      class="w-7 h-7 flex items-center justify-center"
    />
  </label>
</Motion>

<script lang="ts">
  type Colors =
    | 'purple'
    | 'green'
    | 'blue'
    | 'pink'
    | 'gray'
    | 'red'
    | 'yellow';

  // export let color: Colors = 'gray';
  // export let focusColor: Colors = 'yellow';
  export let state: Modifiers = 'default';

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import { useAnimation } from 'svelte-motion';
  import colors from 'tailwindcss/colors';
  import Icon from 'svelte-awesome';
  import xmark from '../../../lib/icons/x-mark';
  import type { IconBoxIcons, Modifiers } from '../utils/interfaces/InputTypes';
  import arrowRightBracket from '../../../lib/icons/arrow-right-to-braket';
  import checkRegular from '../../../lib/icons/check-regular';
  import ellipsisRegular from '../../../lib/icons/ellipsis-regular';
  import envelopeSolid from '../../../lib/icons/envelope-solid';
  import lockAltSolid from '../../../lib/icons/lock-alt-solid';
  import userSolid from '../../../lib/icons/user-solid';

  const data: IconBoxIcons = {
    'arrow-right-to-bracket': arrowRightBracket,
    'x-mark': xmark,
    'check-regular': checkRegular,
    'ellipsis-regular': ellipsisRegular,
    'envelope-solid': envelopeSolid,
    'lock-alt-solid': lockAltSolid,
    'user-solid': userSolid,
  };
</script>

<style lang="sass">

  label 
    width: 50px
    @apply h-full flex items-center justify-center p-2 relative cursor-pointer transition-colors bg-transparent
    

    
    &.left-icon
      @apply rounded-l border-r-2
      
      &[data-state="default"]
        @apply text-gray-500 border-gray-700
      
      &[data-state="hover"]
        @apply bg-gray-500 text-gray-400 border-gray-500

      &[data-state="focus"]
        @apply bg-gradient-to-br from-purple-700 to-purple-900 text-gray-800 border-purple-900

        
      // &[data-state="focus"]
      //   @apply bg-#{$focus}-700 text-#{$color}-800 border-#{$focus}-700
  
    &.right-icon
      @apply rounded-r
    

</style>
