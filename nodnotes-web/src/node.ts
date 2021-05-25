import { v4 as uuidv4 } from "uuid";

type NodeMap = Map<string, Node>;

class Node {
  constructor(
    public id: string,
    public content: string,
    public parent_node_id: string,
    public child_node_id: string,
    public left_node_id: string,
    public right_node_id: string
  ) {}
}

function createNode(
  content: string,
  parent_node_id: string,
  child_node_id: string,
  left_node_id: string,
  right_node_id: string
): Node {
  const node = new Node(
    uuidv4(),
    content,
    parent_node_id,
    child_node_id,
    left_node_id,
    right_node_id
  );
  return node;
}

interface RenderableTree {
  id: string;
  children: RenderableTree[];
}

function map2tree(nodemap: NodeMap, root_node_id: string): RenderableTree {
  if (!root_node_id) {
    throw new Error("if (!root_node_id)");
  }
  const root_node = nodemap.get(root_node_id);
  if (root_node === undefined) {
    throw new Error("if (root_node === undefined)");
  }
  const root: RenderableTree = {
    id: root_node.id,
    children: [],
  };
  root_node.child_node_id;
  let child = nodemap.get(root_node.child_node_id);
  while (child) {
    root.children.push(map2tree(nodemap, child.id));
    child = nodemap.get(child.right_node_id);
  }
  return root;
}

export { Node, createNode, map2tree };
export type { NodeMap, RenderableTree };
