<template>
	<div id="Helpcenter">
		<div class="helptitle">
			<h4 class="title">帮助中心</h4>
			<div class="hotissue">
				<h4><img src="../assets/list.png"/>热门问题</h4>
				<ul>
					<li><img src="../assets/iocs.jpg"/>这个是问题标题这个是问题标题这这这这飞洒发粉色</li>
					<li><img src="../assets/iocs.jpg"/>这个是问题标题这个是问题标题这这这这飞洒发粉色</li>
				</ul>
				<ul>
					<li><img src="../assets/iocs.jpg"/>这个是问题标题这个是问题标题这这这这飞洒发粉色</li>
					<li><img src="../assets/iocs.jpg"/>这个是问题标题这个是问题标题这这这这飞洒发粉色</li>
				</ul>
			</div>
		</div>
		<div class="helpfoot">
			<ul>
				<li>
					<div class="leftimg">
						<img src="../assets/jiatu.png"/>
					</div>
					<div class="righttext">
						<h4>大学了没门户官网</h4>
						<p><span>账号注册</span><span>学生认证</span></p>
						<p>校企合作项目</p>
					</div>
				</li>
				<li>
					<div class="leftimg">
						<img src="../assets/jiatu.png"/>
					</div>
					<div class="righttext">
						<h4>学习云</h4>
						<p><span>我的网盘</span><span>公共区域</span></p>
						<p>回收站</p>
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div class="leftimg">
						<img src="../assets/jiatu.png"/>
					</div>
					<div class="righttext">
						<h4>实训系统</h4>
						<p><span>实训1</span><span>实训3</span></p>
						<p><span>预填方向</span><span>实训3</span></p>
					</div>
				</li>
				<li>
					<div class="leftimg">
						<img src="../assets/jiatu.png"/>
					</div>
					<div class="righttext">
						<h4>测评系统</h4>
						<p><span>性格测试</span><span>岗位倾向测试</span></p>
						<p><span>岗位能力测试</span><span>综合测试</span></p>
					</div>
				</li>
			</ul>
		</div>
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
	#Helpcenter{
		overflow: hidden;
	}
	.helptitle{
		float: right;
		background: white;
		border: 1px solid #d5d5d5;
		box-shadow: 0 2px 4px rgba(0,0,0,.1);
		width: 820px;
		min-height: 200px;
		padding: 0 40px;
		box-sizing: border-box;
	}
	.helpfoot{
		float: right;
		margin-top: 30px;
		width: 100%;
	}
	.title{
		line-height: 50px;
		border-bottom: 1px solid #d5d5d5;
	}
	.hotissue{
		margin-top: 25px;
		margin-left: 15px;
	}
	.hotissue ul{
		margin-top: 10px;
		width: 45%;
		
	}
	.hotissue ul:nth-of-type(1),.helpfoot ul:nth-of-type(1){
		float: left;
	}
	.hotissue ul:nth-of-type(2),.helpfoot ul:nth-of-type(2){
		float: right;
	}
	.hotissue ul li{
		line-height: 40px;
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	}
	.hotissue ul li img{
		margin-right: 5px;
	}
	.helpfoot ul{
		width: 45%;
	}
	.helpfoot ul li{
		background: white;
		height: 100px;
		border: 1px solid #d5d5d5;
		box-shadow: 0 2px 4px rgba(0,0,0,.1);
		padding: 10px;
		box-sizing: border-box;
		margin-bottom: 30px;
	}
	.leftimg{
		float: left;
		margin-right: 10px;
	}
	.righttext h4{
		line-height: 35px;
	}
	.righttext p{
		font-size: 14px;
		line-height: 20px;
		color: #8C8C8C;
	}
	.righttext p span{
		display: inline-block;
		width: 120px;
	}
</style>