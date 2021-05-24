import { writable } from "svelte/store";

interface Node {
  id: string;
  content: string;
  children: Node[];
}

export const rootNode = writable<Node>({
  id: "1",
  content: "root node content",
  children: [
    {
      id: "2",
      content: "child1",
      children: [],
    },
    {
      id: "3",
      content: "child2",
      children: [
        {
          id: "4",
          content: "child2 child1",
          children: [],
        },
      ],
    },
  ],
});
