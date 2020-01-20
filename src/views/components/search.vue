<template>
	<div class="search">
		<div class="item" v-for="(data,index) in searchData">
			<span>{{data.title}}</span>
			<el-input v-if="data.type == 'input'" :placeholder="data.placeholder" v-model="inputData[index]" ></el-input>
			<el-select v-if="data.type == 'select'" v-model="selectData[index]" 
				:placeholder="data.placeholder">
				<el-option
			      v-for="i in data.options"
			      :label="i.label"
			       v-model="i.label"
			      >
			    </el-option>			    
			</el-select>	
			<el-date-picker
			  v-if="data.type == 'date'"
		      v-model="date"
		      type="daterange"
		      range-separator="至"
		      :start-placeholder="data.placeholder1"
		      :end-placeholder="data.placeholder2"
		      :unlink-panels="true">
		    </el-date-picker>	
        
				<el-date-picker
				  v-if="data.type == 'date1'"
					v-model="date"
					type="date"
					:placeholder="data.placeholder">
        </el-date-picker>
		</div>
		<el-button class="btn" type="primary" @click="search()">搜索</el-button>				
	</div>
</template>

<script>
	export default{
		name:"search",
		props:['searchData'],
		data(){
			return{
				inputData:[],
				selectData:[],
				date:''				
			}
		},
		methods:{
			search(){
				this.$emit('search',this.inputData,this.selectData,this.date)
			}
		}
	}
</script>
<style scoped>
.search{
	overflow: auto;
	position: relative; 
}
.search span{
	font-size: 15px;
	margin-left:20px;
}
.el-input{
	width: 200px;
	margin-left:10px; 
}
.el-select{
	width: 160px;
	margin-left:10px; 
}
.item{
	float: left;
	padding:10px 0; 
}
button{
	float: left;
	margin: 10px 0 0 30px; 
}
</style>