<template>
    <div id="SideBar">
        <ul>
            <li  v-for="(bar,index) in bars">
            	<a @click="active(index,bar.title,bar.status)" :class="{active:(index+1)==ins,arrow:(index==3||index==4)&&(bar.title=='帮助中心管理'||bar.title=='意见管理'),arrow2:(index+1)==ins&&(ins==4||ins==5)&&(bar.status==true)}">{{bar.title}}</a>
            	<ul v-if="bar.title=='帮助中心管理'||bar.title=='意见管理'" class="secondleve">
            		<li  :class='{hide:bar.status==false,show:bar.status==true}'
            			v-for="(subbar,index2) in bar.subBar"><a  @click="acti(index2,subbar.title)"  :class="{acti:(index2+1)==inx}" style="color: white;">{{subbar.title}}</a></li>
            	</ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data(){
            return {
                ins: 0,
            }
        },
        props:["bars","inx"],
        methods: {
            active (index,title,status) {
            	console.log(status)
                this.ins=index+1;
                sessionStorage.setItem('isSelect', this.ins);
                this.$emit('jump',title,index)
            },
            acti (indextwo,title) {
                sessionStorage.setItem('isSelect', this.inx);
                this.$emit('jumptwo',title,indextwo)
                console.log(this.inx)
            },
            //重置左侧导航默认第一个
            resetSideBar(){
                this.ins=1;
            }
        },
        created:function(){
            if(sessionStorage.getItem('isSelect')!=''){
                this.ins=sessionStorage.getItem('isSelect');
            }else{
                this.ins=1;
            }
        }
    }

</script>

<style scoped>
    #SideBar{
        background: #393d49;
        width: 200px;
        position: fixed;
        left: 0;
        top: 60px;
        bottom: 0;
        z-index: 999;
    }
    #SideBar li a{
        color: #fff;
        display: block;
        box-sizing: border-box;
        text-align: left;
        padding: 19px 20px;      
    }
    #SideBar .secondleve li a{
        font-size: 14px;
        padding-left: 45px;
    }
    #SideBar li a:hover{
        background: #2e313a;
        transition: all 0.3s;
    }
    #SideBar .active{
        color: #ffd04b;
    }
	#SideBar .acti {
        color: #ffd04b!important;
    }
	#SideBar .hide{
		display: none;

	}
	#SideBar .show{
		display: block;
	}
    #SideBar .arrow{
        background: url('../assets/下箭头.png') 168px 20px no-repeat;
        background-size: 6% 25%
    }
    #SideBar .arrow:hover{
        background: url('../assets/下箭头.png') #2e313a 168px 20px no-repeat;
        background-size: 6% 25%;
        transition: all 0.3s;

    }
    #SideBar .arrow2{
        background: url('../assets/上箭头.png') #2e313a 168px 20px no-repeat;
        background-size: 6% 25%;
    }
    #SideBar .arrow2:hover{
        background: url('../assets/上箭头.png') #2e313a 168px 20px no-repeat;
        background-size: 6% 25%;
        transition: all 0.3s;
    }
</style>