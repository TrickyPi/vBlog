# ssh 配置和 ssh 操作

_trickyPi_ 2019-11-21

## mac 的 ssh 配置（轻量服务器）

备注：假设私钥名称为 xxx.pem

1.首先从阿里云下载私钥，修改私钥属性（chmod 400 xxx.pem）

2.配置本地 ssh 目录下的 config 文件（config 文件默认不存在）(本地 ssh 目录为～/.ssh)

3.连接服务器（ssh Host)

## 详细的 config 文件配置

```bash
Host customize // 自定义的服务器名字
HostName xxx.xxx.xxx.xxx //server ip
Port 22 //ssh port
User root //login username
IdentityFile ~/.ssh/xxx.pem //本地私钥地址
```

有些操作就可以用自定义的服务器名字代替服务器 ip（例如：上传文件时的 servername）

链接服务器的时候就可以输入：ssh customize;

## 上传本地文件或本地目录到远程服务器

```bash
scp /path/local_filename username@servername:/path  //上传文件
scp  -r /tmp/local_dir username@servername:remote_dir //上传文件夹 username@servername可以用自定义名称代替
```
