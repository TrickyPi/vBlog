const fse = require("fs-extra");
const path = require("path");
const babylon = require("babylon");
const { traverse, transformFromAstSync } = require("@babel/core");

let uid = 0;
const assetsPath = (fileName) => {
    const fileString = fse.readFileSync(fileName, "utf8");

    const ast = babylon.parse(fileString, {
        sourceType: "module"
    });

    const id = uid++;
    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            // We push the value that we import into the dependencies array.
            dependencies.push(node.source.value);
        }
    });
    const { code } = transformFromAstSync(ast, null, {
        presets: ["@babel/preset-env"]
    });

    return {
        id,
        fileName,
        code,
        dependencies
    };
};

const graph = (fileName) => {
    const quene = [assetsPath(fileName)];
    for (const currentAssets of quene) {
        currentAssets.mapping = {};
        currentAssets.dependencies.forEach((relativePath) => {
            const dir = path.dirname(currentAssets.fileName);
            const absolutePath = path.join(dir, relativePath);
            const childAssets = assetsPath(absolutePath);
            currentAssets.mapping[relativePath] = childAssets.id;
            quene.push(childAssets);
        });
    }
    return quene;
};

const bundle = (graph) => {
    let modules = "";
    graph.forEach((mod) => {
        modules += `
            ${mod.id}:[
                function(require,module,exports){
                    ${mod.code}
                },
                ${JSON.stringify(mod.mapping)}
            ],
        `;
    });
    const result = `
        (function(modules){
            function require(id){
                const [fn , mapping] = modules[id];
                
                function localRequire(name){
                    return require(mapping[name])
                }
                const module = {exports:{}}
                fn(localRequire,module,module.exports)
                return module.exports
            }
            require(0)
        })({${modules}})
    `;
    return result;
};

// const assets = graph("src/entry.js");
// const result = bundle(assets);

// fse.writeFile("output.js", result);