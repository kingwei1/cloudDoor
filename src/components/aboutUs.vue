<template>
<div class="aboutUs">
  <h4 class="title">关于我们</h4>
  <div style="line-height: 25px; padding-top: 10px;">
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大学了没平台主要是由广西科技大学计算机科学与通信工程学院牵头，与合作企业联合开发并由软件学院校企合作办公室负责开发的一款面向大数据应用与城市计算、
移动互联网应用、人工智能应用、云计算新应用等方向培养创新人才的平台。
<div style="color: rgb(241, 112, 49);">育人理念：以练促学、学以致用</div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.aboutUs {
  float: right;
  background: white;
  border: 1px solid #d5d5d5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  width: 820px;
  min-height: 305px;
  padding: 0 40px;
  box-sizing: border-box;
}

.title {
  line-height: 50px;
  border-bottom: 1px solid #d5d5d5;
}

.aboutUs ul {
  list-style-image: url(../assets/list.png);
  width: 85%;
  margin: 40px auto 0;
}

.aboutUs ul li {
  margin-left: 30px;
  margin-bottom: 20px;
}

.aboutUs ul li span {
  font-size: 14px;
  color: #808080;
}

.code {
  margin-left: 80px;
  margin-bottom: 20px;
}

.code img {
  margin-left: 30px;
}
</style>
