<script lang="ts">
  import { Motion } from "svelte-motion";
  export let size: string | number = 0;
</script>

<Motion let:motion><div use:motion class={`px-${size}`} /></Motion>
