# Go_Gateway网关管理前台

## 前言

​		本前端项目为，Go_Gateway网关的前台管理页面，提供系统服务概览，不同类型服务添加，和服务信息查看等管理系统基础功能，旨在通过前端页面展示的方式，更加便于系统的开发与调试。

**Go_Gateway后端服务地址:**

✨Github: https://github.com/somethingpluto/go-gateway

🚧Gitee: https://gitee.com/chx2333/go_gateway

## 技术选型

​		本项目并未从0开始搭建，而是在开源项目vue-admin-template基础上进行的二次开发。涉及到的技术有：

		1. vue2
		1. axios
		1. vuex
		1. elementUI
		1. echarts

## 使用介绍

### 1.登录界面

![image-20230102192057944](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192057944.png)

​			账号密码已自动填充，且在下方进行了显示，用户可直接进行登录

### 2.服务信息列表界面

![image-20230102192205766](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192205766.png)

​		通过图表的方式展示 当前系统的：

​	1. 服务数量

​	2. 当日请求数

​	3. 当前QPS

​	4. 系统系统用户数目

​	5. 今日系统流量统计

​	6. 和系统中各种服务所占比例

### 3.服务管理额界面

![image-20230102192416757](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192416757.png)

​		显示当前系统中所有服务的信息

### 4.服务具体信息界面

![image-20230102192452069](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192452069.png)

​		具体显示某个服务的统计信息

### 5.服务更新界面

![image-20230102192526563](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192526563.png)

### 6.创建服务界面

### 6.1 创建HTTP服务

![image-20230102192610849](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192610849.png)

### 6.2 创建TCP服务

![image-20230102192621124](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192621124.png)

### 6.3 创建GRPC服务

![image-20230102192629676](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1770/image-20230102192629676.png)
