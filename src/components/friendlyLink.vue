<template>
	<div class="friendlyLink">
		<h4 class="title">友情链接</h4>
		<table >
			<tr>
				<td><a href="http://api.succy.cn/portal/#/cloudHome">实践能力服务平台</a></td>
				<td><a href="http://www.gxust.edu.cn/">广西科技大学</a></td>
				<!-- <td><a href="http://www.gxut.edu.cn/maps/index/id/35">广西科大软件学院</a></td> -->
				<td><a href="http://www.gxrc.com">润澄科技</a></td>
				<td><a href="http://www.briup.com">上海杰普</a></td>
			</tr>
			<tr>
				<td><a href="http://www.mobiletrain.org">千锋教育</a></td>
				<td><a href="http://www.neuedu.com">东软睿道</a></td>
				<td><a href="http://www.gduplooking.com/">深圳尚观</a></td>
			</tr>
			<!--<tr>
				<td>XXXXX网</td>
				<td>XXXXX网</td>
				<td>XXXXX网</td>
			</tr>-->
		</table>
	</div>
</template>

<script>
	export default{

	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.friendlyLink{
		float: right;
		background: white;
		border: 1px solid #d5d5d5;
		box-shadow: 0 2px 4px rgba(0,0,0,.1);
		width: 820px;
		min-height: 305px;
		padding: 0 40px;
		box-sizing: border-box;
	}
	.title{
		line-height: 50px;
		border-bottom: 1px solid #d5d5d5;
	}
	.friendlyLink table{
		width: 100%;
		text-align: center;
		border-spacing: 0px;
	}
	.friendlyLink table td{
		/*display: inline-block;*/
		width: 130px;
		margin: 20px;
		line-height: 80px;
	}
</style>
