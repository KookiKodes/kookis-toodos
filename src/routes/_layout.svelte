<script lang="ts">
  export let segment: string;

  import { AnimateSharedLayout } from "svelte-motion";
  import Nav from "../components/Nav.svelte";
  import useModalState from "../lib/stores/modalView";

  const [_, setModal] = useModalState;
</script>

<AnimateSharedLayout>
  <Nav {segment} on:click={({ detail }) => setModal.on()} />

  <main
    class="bg-gray-900 min-w-screen min-h-screen h-min-content flex flex-col items-center justify-start relative overflow-hidden"
  >
    <slot />
  </main>
</AnimateSharedLayout>