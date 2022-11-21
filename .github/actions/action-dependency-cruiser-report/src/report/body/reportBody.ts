import { uniqueTag } from './uniqueTag';

type Params = {
  owner: string;
  repo: string;
  issueNumber: number;
  sha: string;
  cmdText: string;
  mermaidText: string;
  workingDirectory: string;
};

const NO_OUTPUT_TEXT = 'flowchart LR\n\n\n\n';

const renderMarmeidText = (text: string) => {
  if (text === NO_OUTPUT_TEXT) {
    return 'No outputs was found.';
  }

  return `\`\`\`mermaid
${text}
\`\`\``;
};

export const reportBody = (params: Params) => {
  return `${uniqueTag({
    owner: params.owner,
    repo: params.repo,
    issueNumber: params.issueNumber,
    workingDirectory: params.workingDirectory,
  })}
# dependency-cruiser report

Visualize dependencies of changed files.

${renderMarmeidText(params.mermaidText)}

Report generated by dependency-cruiser-report-action ${params.sha}

---

working directory: \`${params.workingDirectory}\`

<details>
<summary>execute command</summary>

\`\`\`
${params.cmdText}
\`\`\`

</details>
`;
};
