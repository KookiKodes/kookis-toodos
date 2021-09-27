<script lang="ts">
  export let segment: string;

  import Button from "../components/Button.svelte";
  import Spacer from "../components/Spacer.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const triggerClick = ({ detail: {event, animate} }: CustomEvent) => {
    animate.start({
      scale: [1, .85, 1]
    })
    dispatch("click", event)
  };
</script>

<nav
  class="w-screen h-min-content py-2 px-6 flex align-center justify-center bg-gray-800 fixed z-30 border-b-2 border-transparent transition-all hover:border-purple-700"
>
  <div
    class="w-full h-full max-w-1440 z-50 flex items-center justify-center md:justify-end relative"
  >
    <Button id="signIn" dataType="outline" on:click={triggerClick} whileHover={{scale: 1.15}} initial={{scale: 1}} focusOnLoad transition={{ type: "spring", duration: 0.2 }}
      >Sign In</Button
    >
    <Spacer size="6" />
    <Button
      id="signUp"
      dataType="default"
      on:click={triggerClick}
      whileHover={{scale: 1.15}}
      initial={{scale: 1}}
      transition={{ type: "spring", duration: 0.2 }}
    >
      Sign Up
    </Button>
  </div>
</nav>
