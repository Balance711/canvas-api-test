# 使用说明

* 在终端输入tsc
* F5运行

#更新

* 重构了DisplayObject的draw方法，增加了render方法，其子类通过覆盖render方法来完成内部逻辑,增加了相应的关于alpha值，x,y角度的成员变量，以及相对应的global变量

* 在上一版本上改进了文本框和位图的显示方法，增加了矩阵matrix ，通过矩阵的变换对DisplayObject的平移旋转缩放进行修改
