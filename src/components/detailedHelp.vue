<template>
	<div id="detaileHelp">
		<el-row class="tac"> 
		  <el-col :span="5">
		    <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose"
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#ffd04b">
		      <el-submenu index="1">
		        <template slot="title">
		          <span>导航一</span>
		        </template>
		        <el-menu-item-group> 
		          <el-menu-item index="1-1">选项1</el-menu-item>
		          <el-menu-item index="1-2">选项2</el-menu-item>
		          <el-menu-item index="1-3">选项3</el-menu-item>
		          <el-menu-item index="1-4">选项4</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	 export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
</style>