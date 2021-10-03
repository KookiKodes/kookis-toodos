{#if display}
  <Wrapper {hasOverlay}>
    <Overlay
      slot="overlay"
      on:close={handleClose}
      variants={overlayVariants}
      initial="from"
      animate="to"
      exit="end"
      transition={overlayTransition}
      isOpen={$modalView && display}
      id={overlayId}
    />
    <Container
      slot="container"
      on:close={handleClose}
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="end"
      transition={containerTransition}
      isOpen={$modalView && display}
      buttonId={closeBtnId}
      focusOnView
    >
      <slot name="header" slot="header" />
      <slot name="body" slot="body" />
      <slot name="footer" slot="footer" />
    </Container>
  </Wrapper>
{/if}

<script lang="ts">
  export let hasOverlay: boolean;
  export let focusIds: string[] = [];

  import { createEventDispatcher } from 'svelte';
  import { modalView } from '../../lib/stores/modalView';
  import { focusElem } from '../../lib/stores/focusSelector';
  import Wrapper from './Wrapper.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import Container from './Container.svelte';
  import containerVariants, {
    transition as containerTransition,
  } from '../../lib/variants/modalContainerVariants';
  import Overlay from './Overlay.svelte';
  import overlayVariants, {
    transition as overlayTransition,
  } from '../../lib/variants/modalOverlayVariants';

  // const dispatch = createEventDispatcher();

  const closeBtnId = uuidv4(),
    overlayId = uuidv4();
  const ids = [closeBtnId, overlayId, ...focusIds];

  let display: boolean = false;

  $: prevModalState =
    $focusElem && ids.includes($focusElem.id) ? $focusElem : prevModalState;

  $: if ($modalView && $focusElem && !ids.includes($focusElem.id)) {
    if (prevModalState) prevModalState.focus();
  }

  $: previousState =
    $focusElem && !ids.includes($focusElem.id) ? $focusElem : previousState;

  $: if ($modalView) display = true;

  async function displayOff(time: number) {
    await delay(time);
    display = !display;
  }

  function delay(time: number): Promise<boolean> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(true);
      }, time);
    });
  }

  async function handleClose(e: Event) {
    focusElem.withFocusSelector(previousState);
    modalView.off();
    previousState.focus();
    displayOff(500);
  }
</script>
