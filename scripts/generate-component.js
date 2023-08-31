const fs = require("fs");
const path = require("path");

const mkdir = async (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  return fs.mkdirSync(dir);
};

const writeFile = (p, ...args) => {
  fs.writeFileSync(p, ...args);
};

(() => {
  const inputComponentName = process.argv[2];
  const workspace = "Components";
  const fileType = process.argv[3] || "tsx";
  const rootPath = path.join(__dirname, `../src/${workspace}`);
  const genRoot = path.join(rootPath, inputComponentName);

  mkdir(genRoot);

  writeFile(
    path.join(genRoot, `${inputComponentName}.style.${fileType}`),
    `import styled, {css} from 'styled-components';`
  );
  if (fileType === "js") {
    writeFile(
      path.join(genRoot, `${inputComponentName}.${fileType}`),
      `import React from "react"; \n

export const ${inputComponentName} = (props) => {\n

  return (
    <div>This a ${inputComponentName} component</div>
  )
}`
    );
  } else {
    writeFile(
      path.join(genRoot, `${inputComponentName}.${fileType}`),
      `import React from "react"; \n
export interface ${inputComponentName}Props {}

export const ${inputComponentName}: React.SFC<${inputComponentName}Props> = (props) => {\n

  return (
    <div>This a ${inputComponentName} component</div>
  )
}`
    );
  }
})();
