<template>
<div id="main">
  <!-- 这一块功能暂时不开放 -->
  <div class="backLayout" v-if="false">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>问题分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="oneclass">
        <h4>
          <span>一级分类</span>
						<!--  写死，暂时不支持操作 -->
          <!-- <i class="el-icon-plus"></i> -->
        </h4>
        <ul>
          <li v-for="item in firstTableData">
            <p>{{item.name}}<i class="el-icon-arrow-right"></i></p>
						<!--  写死，暂时不支持操作 -->
            <!-- <el-button type="primary">编辑</el-button>
            <el-button type="warning">已隐藏</el-button> -->
          </li>
        </ul>
      </div>
      <div class="twoclass">
        <h4>
					<span>二级分类</span>
					<!--  写死，暂时不支持操作 -->
					<!-- <i class="el-icon-plus"></i> -->
				</h4>
        <ul>
          <li v-for="item in secondTableData">
            <p>
              <span>{{item.name}}</span>
              <!-- <span>有用：50</span>
              <span>没有用：50</span> -->
            </p>
            <!-- <el-button type="primary">编辑</el-button>
            <el-button type="warning">已隐藏</el-button> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="backLayout" style="text-align: center; margin-top: 250px; font-size: 16px; color: #ccc;">暂无数据</div>
</div>
</template>

<script>
export default {
  name: "questions-classification",
  components: {},
  data() {
    return {
      firstTableData: [{
        name: '实训系统_1',
      }, {
        name: '实训系统_2'
      }, {
        name: '实训系统_3'
      }, {
        name: '实训系统_4'
      }],
      secondTableData: [{
        name: '学习云_1'
      }, {
        name: '学习云_2'
      }, {
        name: '学习云_3'
      }, {
        name: '学习云_4'
      }],
    }
  }
}
</script>

<style scoped>
h4,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.content {
  width: 1100px;
  height: 500px;
  margin: 0 auto;
}

.content .oneclass,
.content .twoclass {
  width: 45%;
  height: 100%;
  background: #f0f0f2;
  border: 1px solid #dddddd;
  padding: 30px;
  box-sizing: border-box;

}

.content .oneclass {
  float: left;
}

.content .twoclass {
  float: right;
}

h4 i,
.content .oneclass p i {
  float: right;
  font-size: 20px;
  font-weight: 900;
}

.content ul li {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}

.content p {
  float: left;
  width: 250px;
  padding-left: 10px;
}

.content .oneclass p i {
  margin-right: 40px;
}

.content p span {
  padding: 12px;
}

.content .el-button {
  border-radius: 15px;
  padding: 5px 10px;
  margin: 12px;
}
</style>
