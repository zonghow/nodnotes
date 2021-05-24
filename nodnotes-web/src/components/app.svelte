<script lang="typescript">
  import { onMount } from "svelte";
  import Node from "./node.svelte";
  import { rootNode } from "../store";

  onMount(() => {});
</script>

<div>
  <input bind:value={$rootNode.content} />
  {#each $rootNode.children as child}
    <Node id={child.id} content={child.content} children={child.children} />
  {/each}
</div>
