<script lang="ts">
  export let hasOverlay: boolean = true;

  import { createEventDispatcher } from "svelte";
  import { Motion, AnimatePresence } from "svelte-motion";
  import useModalState from "../lib/stores/modalView";
  import useFocusState from "../lib/stores/focusSelector";
  import colors from "tailwindcss/colors";
  import FocusSelector from "./FocusSelector.svelte";
  import Icon from "svelte-awesome/components/Icon.svelte";
  import xmark from "../lib/icons/x-mark";
  import Button from "../components/Button.svelte"

  const dispatch = createEventDispatcher();
  const [state, setState] = useModalState;
  const [focusState, setFocusState] = useFocusState;

  const ids = ["modalOverlay", "modalCloseButton"];

  $: prevModalState =
    $focusState && ids.includes($focusState.id) ? $focusState : prevModalState;

  $: if ($state && $focusState && !ids.includes($focusState.id)) {
    if (prevModalState) prevModalState.focus();
  }

  $: previousState =
    $focusState && !ids.includes($focusState.id) ? $focusState : previousState;

  function initFocus(el) {
    el.focus();
    setFocusState(el);
  }

  function delay(time: number): Promise<boolean> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(true);
      }, time);
    });
  }

  async function handleClick(e: Event) {
    // await delay(1000);
    setFocusState(previousState);
    setState.off();
    previousState.focus();
  }
</script>

<AnimatePresence show={$state}>
  {#if $state}
    <!-- <Motion
      let:motion
      initial={{
        background: colors.gray[900] + "00",
        backdropFilter: "blur(0px)",
      }}
      animate={{
        background: hasOverlay
          ? colors.gray[900] + "66"
          : colors.gray[900] + "00",
        backdropFilter: "blur(6px)",
      }}
      transition={{ duration: 0.5 }}
    > -->
      <Button
        on:click={handleClick}
        class="w-full h-full absolute top-0 left-0 z-40 focus:outline-none"
        id="modalOverlay"
        initial={{
          background: colors.gray[900] + "00",
          backdropFilter: "blur(0px)",
        }}
        animate={{
          background: hasOverlay
            ? colors.gray[900] + "66"
            : colors.gray[900] + "00",
          backdropFilter: "blur(6px)",
        }}
        transition={{ duration: 0.5 }}
      />
    <!-- </Motion> -->
    <Motion let:motion={m1}>
      <div
        use:m1
        class="w-full h-full bg-transparent flex align items-center justify-center absolute"
      >
        <div
          class="z-50 w-96 h-min-content flex items-end justify-end bg-gray-900 relative p-4 border-2 border-gray-700 rounded"
        >
          <Button
            focusOnLoad
            on:click={handleClick}
            class="bg-transparent relative focus:outline-none p-3 hover:text-purple-700 focus:text-purple-700 text-gray-500 transform transition-all hover:scale-110"
            id="modalCloseButton"
          >
            <Icon data={xmark} class="w-6 h-6" />
        </Button>
          <slot name="header" />
          <slot name="body" />
          <slot name="footer" />
        </div>
      </div>
    </Motion>
  {/if}
</AnimatePresence>
