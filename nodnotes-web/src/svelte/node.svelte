<script>
  import cls from "../classnames";
  import { onMount, tick } from "svelte";
  import { store } from './store'
  import type { Node } from "../types";
  let editing = false;
  let textareaElement: HTMLTextAreaElement | undefined;

  export let id: Node["id"];
  export let content: Node["content"];
  export let children: Node[];

  async function handleRenderedContentClick() {
    editing = true;
    $store.editingNodeID = id
  }
  function handleTextareaBlur() {
    console.log("handle blur")
    editing = false;
    $store.editingNodeID = ""
  }

  onMount(() => {
    console.log("nod id", id);
    if (editing) {
      $store.editingNodeID = id
    }
  });

  $: if ($store.editingNodeID === id) {
    (async () => {
      await tick()
      textareaElement?.focus();
    })()
  }

  function handleTextareaChange(e) {
    $store.nodes[id].content = e.target.value
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
  <!-- render children -->
  {#if children.length > 0}
    <div class="pl-3">
      {#each children as child}
        <svelte:self
          id={child.id}
          content={child.content}
          children={child.children}
        />
      {/each}
    </div>
  {/if}
</div>
