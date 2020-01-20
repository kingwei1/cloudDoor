<template>
	<div id="breadcrumb1">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item v-for="data in menu" :class=data.class :to="{ path: data.path, query: data.query}">{{data.title}}</el-breadcrumb-item>		  
		</el-breadcrumb>
	</div>
</template>

<script>
	export default{
		name:'breadcrumb',
		props:['menu'],
		data(){
			return{
				
			}
		},
		methods:{

		}
	}
</script>

<style scope>
.el-breadcrumb__inner.is-link{
		font-weight: normal;
	}
 .el-breadcrumb__inner.is-link:hover{
		font-weight: bolder;
		color: #000
	}
 .el-breadcrumb{
  	font-size: 16px!important;
  	display: inline-block;
  	width: 100%;
  	line-height: 40px
  }
.el-breadcrumb>span:nth-child(1){
  	border-left: 4px solid #000;
  }
 .el-breadcrumb .el-button{
  	 float: right;
  }
</style>