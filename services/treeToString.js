export function treeToString(nodes, prefix = "") {
  let result = "";

  for (const node of nodes) {
    result += `${prefix}${node.name}\n`;

    if (node.children) {
      result += treeToString(
        node.children,
        prefix + "  "
      );
    }
  }

  return result;
}