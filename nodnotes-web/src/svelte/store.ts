import { writable } from "svelte/store"
import { createNode, Node } from "../node"
import type { NodeMap } from "../node"

const store = writable({
  node: {
    node_map: new Map(),
    root_node_id: "",
    editing_node_id: "",
  },
})

function initNodeMap() {
  const data_nodes = {
    content: "这是根节点",
    children: [
      {
        content: "这是第一个子节点",
        children: [
          {
            content: "这是第一个子节点的第一个子节点",
          },
        ],
      },
      {
        content: "这是第二个子节点",
        children: [
          {
            content: "这是第二个子节点的第一个子节点",
            children: [
              {
                content: "这是第二个子节点的第一个子节点的第一个子节点",
              },
            ],
          },
        ],
      },
    ],
  }

  const nodemap: NodeMap = new Map()
  const helper = (data_nodes: any, parent_node_id: string) => {
    const node = createNode(data_nodes.content, parent_node_id, "", "", "")
    nodemap.set(node.id, node)
    if (data_nodes.children && data_nodes.children.length) {
      let left: any = null
      data_nodes.children.forEach((data_child: any, idx: number) => {
        const n = helper(data_child, node.id)
        if (idx === 0) {
          left = n
          node.child_node_id = n.id
        } else if (idx > 0) {
          left.right_node_id = n.id
          n.left_node_id = left.id
        }
      })
    }
    return node
  }
  const r = helper(data_nodes, "")

  store.set({
    node: {
      node_map: nodemap,
      root_node_id: r.id,
      editing_node_id: "",
    },
  })

  console.log(nodemap.values())
}

export { store, initNodeMap }
