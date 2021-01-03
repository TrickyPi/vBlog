# webhook

## webhook简介
webhook是一种由特定事件触发并由用户定义的HTTP回调，
[维基百科](!https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E9%92%A9%E5%AD%90)

## 如何使用webhook

使用webhook时，需要提供一个公网能访问的hook-url，且hook-url对应的服务端有一个相应的服务可以接受webhook请求

## 应用场景
对于普通开发者来说，比如实现github自动构建流；github上有一个webhook功能，当用户触发了某个事件时，github会向目标服务器发送一个请求，   
目标服务器就可以进行自定义的相应操作，比如构建操作

## 简单的例子实现
1:github上的webhook设置    
2:在远程服务器起一个node服务    
3:git push    
4:push会触发webhook钩子，github会发一个请求到node服务    
5:node服务收到之后执行shell脚本开始构建流程