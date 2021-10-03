{#if hasOverlay}
  <slot name="overlay" />
{/if}
<slot name="container" />

<script lang="ts">
  export let hasOverlay: boolean = true;
</script>
