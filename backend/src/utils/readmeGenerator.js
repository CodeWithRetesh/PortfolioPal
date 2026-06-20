export function generateReadme(
  project
) {
  return `
# ${project.title}

## Abstract
${project.abstract}

## Features
${project.features.join("\n- ")}

## Conclusion
${project.conclusion}
`;
}