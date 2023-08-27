const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
console.log(process.cwd())

if (!componentName) {
  console.error('Component name must be specified');
  process.exit(1);
}

const componentDir = path.resolve(process.cwd(), componentName);
const typesDir = path.join(componentDir, 'types');

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists`);
  process.exit(1);
}

fs.mkdirSync(componentDir);
fs.mkdirSync(typesDir);

const componentContent = `import { FC } from 'react';

import { ${componentName}Props } from './types';

export const ${componentName}: FC<${componentName}Props> = (props) => {
  return (
    <>
    </>
  );
};
`;

const typesContent = `export interface ${componentName}Props {
    
}
`;

const indexContent = `import { ${componentName} } from './${componentName}'

export default ${componentName}
`;



fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);
fs.writeFileSync(path.join(typesDir, 'index.ts'), typesContent);

console.log(`Component ${componentName} created successfully.`);