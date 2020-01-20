<template>
	<div id="breadcrumb">
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
.el-breadcrumb{
	/*font-size:15px !important;*/
	/*line-height: 2 !important;*/
}
</style>