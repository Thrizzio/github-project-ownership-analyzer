export function buildMetadata({
  readme,
  packageJson,
  treeString
}) {
  return {
    readme,

    dependencies: Object.keys(
      packageJson?.dependencies || {}
    ),

    devDependencies: Object.keys(
      packageJson?.devDependencies || {}
    ),

    fileTree: treeString
  };
}