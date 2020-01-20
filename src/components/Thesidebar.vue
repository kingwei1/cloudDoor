<template>
	<section id="mian">
		<div class="sidebar-left">
			<ul>
				<li><router-link to="/Enterprise">企业合作<i class="el-icon-arrow-right"> </i></router-link></li>
				<li><router-link to="/aboutUs">关于我们<i class="el-icon-arrow-right"> </i></router-link></li>
				<!--<li><router-link to="/Helpcenter">帮助中心<i class="el-icon-arrow-right"> </i></router-link></li> -->
				<li><router-link to="/feedback">意见反馈<i class="el-icon-arrow-right"> </i></router-link></li>
				<li><router-link to="/contact">联系我们<i class="el-icon-arrow-right"> </i></router-link></li>
				<li><router-link to="/friendlyLink">友情链接<i class="el-icon-arrow-right"> </i></router-link></li>
			</ul>
		</div>
		<div class="sidebar-right">
			<router-view></router-view>
		</div>
	</section>
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
	#mian{
		width: 1150px;
		min-height: 500px;
		background: #eeeeee;
		box-sizing: border-box;
		margin: 30px auto;
		overflow: hidden;
	}
	.sidebar-left{
		background: white;
		margin: 30px;
		border: 1px solid #d5d5d5;
		box-shadow: 0 2px 4px rgba(0,0,0,.1);
	}
	.sidebar-left{
		text-align: center;
		float: left;
		width: 200px;
		height: 305px;
	}
	.sidebar-left ul li a{
		display: block;
		line-height: 50px;
		border-bottom: 1px solid #d5d5d5;
	}
	.sidebar-left ul li a{
		color: black;
		font-size: 16px;
	}
	.sidebar-left ul li i{
		margin-left: 40px;
		font-weight: 900;
	}
	.sidebar-right{
		float: right;
		margin: 30px;
		width: 820px;
		box-sizing: border-box;
	}
	.sidebar-left ul li .router-link-active{
		color: white;
		background: #37abfe;
	}
</style>
