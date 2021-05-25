import uuid from "uuid";

interface Node {
  id: string; // uuid
  content: string;
  parent: string;
  child: string;
  right: string;
}

function createNodeTree() {
  const nodesmap = new Map();

  function createNode(
    id: string,
    content: string,
    parent: string | Node,
    child: string | Node,
    right: string | Node
  ): Node {
    if (id !== "" && !uuid.validate(id)) {
      throw new Error("id must be a valid uuid");
    }
    const node: Node = {
      id: id || uuid.v4(),
      content: content,
      parent: typeof parent === "string" ? parent : parent.id,
      child: typeof child === "string" ? child : child.id,
      right: typeof right === "string" ? right : right.id,
    };
    return node;
  }

  function insert(node: Node, parent: Node | null, left: Node | null) {}

  function remove(node: Node) {}

  return {
    createNode,
    insert,
    remove,
  };
}

export { createNodeTree };
