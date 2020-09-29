# 冒泡

## 概念
把相邻的元素两两比较，当一个元素大于右侧相邻元素时，交换它们的位置;当一个元素小于或等于右侧相邻元素时，位置不变

## 基本版本的冒泡
代码非常简单，使用双循环进行排序。外部循环控制所有的回合，内部循环实 现每一轮的冒泡处理，先进行元素比较，再进行元素交换
```js
var sort = (array) => {
    for (let i = 0, len = array.length; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            let tmp = 0;
            if (array[j] > array[j + 1]) {
                tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
            }
        }
    }
}
```

## 优化（是否为已排序的数组）
基本版本的冒泡的时候，即使当数组已经是排序完成了，也会继续执行下去，所以这一版本的优化加了一个标志位，用于判断该数组是否是排序完成的数组；
```js
var sort = (array) => {
    for (let i = 0, len = array.length; i < len - 1; i++) {
        let isSorted = true;
        for (let j = 0; j < len - i - 1; j++) {
            let tmp = 0;
            if (array[j] > array[j + 1]) {
                tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
                isSorted = false
            }
        }
        if (isSorted) {
            break
        }
    }
}
```

## 优化（边界）
在前面优化的基础上，还有一个优化的地方就是当数组进行冒泡排序的时候，对需要排序的区域进行判断，那就会有一个边界值，超过这个边界就不再判断；
```js
var sort = (array) => {
    let lastExchangeIndex = 0
    let sortBorder = array.length - 1
    for (let i = 0; i < sortBorder; i++) {
        let isSorted = true;
        for (let j = 0; j < sortBorder; j++) {
            let tmp = 0;
            if (array[j] > array[j + 1]) {
                tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
                isSorted = false
                lastExchangeIndex = j
            }
        }
        sortBorder = lastExchangeIndex;
        if (isSorted) {
            break
        }
    }
}
```