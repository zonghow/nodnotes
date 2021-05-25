<script lang="typescript">
  import { onMount } from "svelte";
  import Node from "./node.svelte";
  import { store, renderableTree } from "./store";
  import { registerHotkeys, hotkeyEE, Hotkey } from "../hotkey";

  onMount(() => {
    registerHotkeys();
    hotkeyEE.on(Hotkey.UP.eekey, () => {
      console.log("up");
      console.log($store.editingNodeID)
    });
    hotkeyEE.on(Hotkey.INDENT.eekey, () => {
      console.log("indent");
      console.log($store.editingNodeID)
    });
    hotkeyEE.on(Hotkey.UNINDENT.eekey, () => {
      console.log("unindent");
      console.log($store.editingNodeID)
    });
  });
</script>

<div>
  {#if renderableTree}
    <input bind:value={$renderableTree.content} />
    {#each $renderableTree.children as child}
      <Node id={child.id} content={child.content} children={child.children} />
    {/each}
  {/if}
</div>
