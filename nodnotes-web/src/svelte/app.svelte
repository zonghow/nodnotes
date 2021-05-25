<script lang="typescript">
  import { onMount } from "svelte";
  import { store, initNodeMap } from "./store";
  import Node from "./node.svelte";
  import * as hk from "../hotkey";
  import { map2tree } from "../node";
  import type { RenderableTree } from "../node";

  let tree: RenderableTree | undefined;
  $: if ($store.node.node_map.size && $store.node.root_node_id) {
    tree = map2tree($store.node.node_map, $store.node.root_node_id);
    console.log("tree", tree);
  }
  onMount(() => {
    initNodeMap();
    hk.Down.on(() => {
      console.log("down");
    });
    hk.Indent.on(() => {
      console.log("indent");
    });
    hk.Unindent.on(() => {
      console.log("unindend");
    });
    hk.Up.on(() => {
      console.log("up");
    });
  });
</script>

<div>
  {#if tree}
    <input class="text-2xl" value={$store.node.node_map.get(tree.id).content} />
    {#each tree.children as child}
      <Node
        id={child.id}
        content={$store.node.node_map.get(child.id).content}
        children={child.children}
      />
    {/each}
  {/if}
</div>
