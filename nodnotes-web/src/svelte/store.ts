import { derived, writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { keyBy } from "lodash";

interface Node {
  id: string; // uuid
  content: string;
  parent: string;
  child: string;
  right: string;
}

export interface NodeByID {
  [id: string]: Node;
}

function createNode(
  content: string,
  parent: string | Node,
  child: string | Node,
  right: string | Node
): Node {
  const node: Node = {
    id: uuidv4(),
    content: content,
    parent: typeof parent === "string" ? parent : parent.id,
    child: typeof child === "string" ? child : child.id,
    right: typeof right === "string" ? right : right.id,
  };
  return node;
}

function createStore() {
 return writable({
    editingNodeID: "",
    rootNodeID: "1",
    nodes: keyBy(
      [
        {
          id: "1",
          content: "root",
          parent: "",
          child: "2",
          right: "",
        },
        {
          id: "2",
          content: "node 2",
          parent: "1",
          child: "",
          right: "3",
        },
        {
          id: "3",
          content: "node 3",
          parent: "1",
          child: "4",
          right: "",
        },
        {
          id: "4",
          content: "node 4",
          parent: "1",
          child: "5",
          right: "",
        },
        {
          id: "5",
          content: "node 5",
          parent: "4",
          child: "",
          right: "",
        },
      ],
      "id"
    ),
  })
}

interface RenderableNodeTree {
  id: string;
  content: string;
  children: RenderableNodeTree[];
}

const makeRenderableTree = (
  nodesDic: NodeByID,
  rootNodeId: string
): RenderableNodeTree | undefined => {
  const rootNode = nodesDic[rootNodeId];
  if (!rootNode) return;
  const root: RenderableNodeTree = {
    id: rootNodeId,
    content: rootNode.content,
    children: [],
  };
  let child = rootNode.child ? nodesDic[rootNode.child] : undefined;
  while (child) {
    const childTreeNode = makeRenderableTree(nodesDic, child.id);
    if (childTreeNode) {
      root.children.push(childTreeNode);
    }
    child = child.right ? nodesDic[child.right] : undefined;
  }
  return root;
};

export const store = createStore();

export const renderableTree = derived(store, ($store) => {
  return makeRenderableTree($store.nodes, $store.rootNodeID);
});
