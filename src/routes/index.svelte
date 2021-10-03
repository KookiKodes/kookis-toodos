<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<section
  class="w-full h-min-content pt-36 flex items-start justify-center relative"
>
  <a
    class="relative text-4xl z-10 lg:text-9xl font-extralight text-purple-600 focus:outline-none"
    id="todos"
    href="#nowhere"
    on:focus={handleFocus}
  >
    Kooki's Toodos
    <FocusSelector name="todos" />
  </a>
  <Modal
    hasOverlay
    focusIds={['username', 'password', 'submitBtn', 'infoText']}
  >
    <svelte:fragment slot="header">
      <h1
        class="flex text-4xl whitespace-normal max-w-400 font-light text-gray-400"
      >
        Please use the fields below to sign into your existing account.
      </h1>
    </svelte:fragment>
    <svelte:fragment slot="body">
      <Input
        type="text"
        leftIcon="user-solid"
        id="username"
        name="Username"
        placeholder="Username"
        preventFocus={!$modalView}
      />
      <Input
        type="password"
        leftIcon="lock-alt-solid"
        id="password"
        name="Password"
        placeholder="Password"
        preventFocus={!$modalView}
      />
      <SubmitBtn
        id="submitBtn"
        iconRight="arrow-right-to-bracket"
        preventFocus={!$modalView}
        on:click={(e) => console.log(e)}>Sign In</SubmitBtn
      >
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <InfoText id="infoText" on:click={(e) => console.log(e)} />
    </svelte:fragment>
  </Modal>
</section>

<script lang="ts">
  import FocusSelector from '../components/FocusSelector.svelte';
  import Modal from '../components/Modal/index.svelte';
  import Input from '../components/Form/Input/index.svelte';
  import SubmitBtn from '../components/Form/SubmitBtn/index.svelte';
  import InfoText from '../components/Form/InfoText/index.svelte';
  import { focusElem } from '../lib/stores/focusSelector';
  import { modalView } from '../lib/stores/modalView';

  function handleFocus(e: FocusEvent) {
    focusElem.withFocusSelector(e.target as HTMLElement);
  }
</script>
