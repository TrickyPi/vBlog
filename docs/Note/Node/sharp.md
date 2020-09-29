# sharp

### sharp简介

sharp是一个高效的node.js的图片处理插件；

### 基本用法

基本用法可以查看npm官网和sharp官网，
```js
const sharp = require('sharp');

sharp('input.jpg')
    .rotate()
    .resize(200)
    .toBuffer()
    .then( data => { ... })
    .catch( err => { ... });

sharp('input.jpg')
    .rotate()
    .resize(200)
    .toBuffer((err, data, info) => { ... })
```

上面的例子用`toBuffer`api做演示，有些api没有设置回调函数的时候，会返回一个`promise`对象

[npm](https://www.npmjs.com/package/sharp)

[sharp](https://sharp.pixelplumbing.com/en/stable/)

## 生成雪碧图

用sharp插件实现生成雪碧图

### 思路
首先我们得获取所有的图片的高度和宽度，然后得到一帧图片的宽高，然后根据想生成几行或几列来决定整个画布的大小;然后把每个图片和底图画布进行合并；就可以生成一张雪碧图；

读取文件夹下的图片
```js
const fs = require('fs-extra');
const sharp = require('sharp');
const CWD = process.cwd();
const { gSprite } = require('./utils/config')

const RegExp = /\.[jpg|gif|png]/i
const dealWithFolder = `${CWD}/${gSprite.targetFolder}/`

const files = fs.readdirSync(dealWithFolder)
    .filter(item => RegExp.test(item))
```


配置文件：config.js
```js
module.exports = {
    gSprite:{
        x:4,//设置x轴4列
        targetFolder:'spriteSource'
    }
};
```

用一个数组存放sharp读取文件时返回的promise对象
```js
const PromiseArr = files.map(item =>
    sharp(dealWithFolder + item)
        .metadata()
)
```

```js
Promise.all(PromiseArr).then(res => {
    const imglistInfo = res.map(item => {
        return {
            width: item.width,
            height: item.height
        }
    })

    const baseSharp = sharp({
            create: {
                width: width,
                height: height,
                channels: 4,//通道    解释：rgba图片为4通道
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            }
        })
        .png()
        .toBuffer()


    files.reduce(function (baseSharp, item, index) {
        let itemConfig = null;
        if (gSprite.x) {
            itemConfig = {
                left: index % gSprite.x * maxWidth + parseInt((maxWidth - imglistInfo[index].width) / 2),
                top: parseInt(index / gSprite.x) * maxHeight + parseInt((maxHeight - imglistInfo[index].height) / 2)
            }
        } else if (gSprite.y) {
            itemConfig = {
                left: parseInt(index / gSprite.y) * maxWidth + parseInt((maxWidth - imglistInfo[index].width) / 2),
                top: index % gSprite.y * maxHeight + parseInt((maxHeight - imglistInfo[index].height) / 2)
            }
        }
        return baseSharp
            .then(data =>
                sharp(data)
                    .composite([{ input: dealWithFolder + item, gravity: 'southeast', ...itemConfig }])
                    .png()
                    .toBuffer()
            )
    }, baseSharp)
        .then(data => {
            const filename = new Date().valueOf()
            sharp(data)
                .png()
                .toFile(`${CWD}/sprite${filename}.png`)
                .then(info => {})
                .catch(err => {})
        })
})
```