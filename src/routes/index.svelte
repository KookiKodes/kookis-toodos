<script lang="ts">
  import FocusSelector from "../components/FocusSelector.svelte";
  import Modal from "../components/Modal.svelte";
  import focusState from "../lib/stores/focusSelector";

  const [_, setFocusElem] = focusState;

  function handleFocus(e: FocusEvent) {
    setFocusElem(e.target as HTMLElement);
  }
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<section class="w-full h-min-content pt-36 flex items-start justify-center">
  <a
    class="relative text-4xl z-10 lg:text-9xl font-extralight text-purple-600 focus:outline-none"
    id="todos"
    href="#nowhere"
    on:focus={handleFocus}
  >
    Kooki's Toodos
    <FocusSelector name="todos" />
  </a>
  <Modal />
</section>
