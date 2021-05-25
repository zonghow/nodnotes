<script>
  import cls from "../classnames";
  import { tick } from "svelte";
  import { store } from "./store";
  import type { RenderableTree } from "../node";

  let editing = false;
  let textareaElement: HTMLTextAreaElement | undefined;

  export let id: string;
  export let content: string;
  export let children: RenderableTree[];

  async function handleRenderedContentClick() {
    $store.node.editing_node_id = id;
  }

  function handleTextareaBlur() {
    $store.node.editing_node_id = "";
  }

  function handleTextareaChange(e: Event) {
    $store.node.node_map.get(id).content = (e as any).target.value;
  }

  $: {
    editing = $store.node.editing_node_id === id;
    if (editing) {
      (async () => {
        await tick();
        textareaElement?.focus();
      })();
    }
  }
</script>

<div>
  <div
    class={cls("w-80", {
      "bg-gray-100": editing,
    })}
  >
    <a class="leading-4 inline-block align-middle" href="/">
      <div class="w-1.5 h-1.5 bg-gray-500 rounded-full" />
    </a>
    <textarea
      class={cls(
        "align-middle inline-block outline-none leading-4 bg-transparent text-base resize-none break-words",
        {
          hidden: !editing,
          "inline-block": editing,
        }
      )}
      on:change={handleTextareaChange}
      on:blur={handleTextareaBlur}
      bind:this={textareaElement}
      bind:value={content}
    />
    <div
      class={cls("align-middle inline-block leading-4 text-base", {
        hidden: editing,
        "inline-block": !editing,
      })}
      on:click={handleRenderedContentClick}
    >
      {content}
    </div>
  </div>
  {#if children.length > 0}
    <div class="pl-3">
      {#each children as child}
        <svelte:self
          id={child.id}
          content={$store.node.node_map.get(child.id).content}
          children={child.children}
        />
      {/each}
    </div>
  {/if}
</div>
