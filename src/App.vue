<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{

  },
  Destroy(){
    window.addEventListener('beforeunload', e => {
      window.localStorage.removeItem('token')
    });
  },
}
</script>

<style>
  /**全局变量定义在这里，用root定义，用var读取**/
  :root{
    --blue:#0089de;
  }
  body{
    font-size: 16px;
    margin:0;
  }
  a{
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
  }
  ul{
    list-style: none;
    overflow: auto;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: '微软雅黑';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #main{
    box-sizing: border-box;
  }
  .layout{
    width: 1172px;
    margin: auto;
    overflow: auto;
  }
  .el-breadcrumb{
    font-size: 20px !important;
    margin:25px 0px 25px;
  }
  .el-breadcrumb>span:nth-child(1){
    padding-left: 16px;
    border-left: 4px solid var(--blue);
  }
  #main .blue span {
    color: var(--blue);
  }
  .blue{
    color: var(--blue);
  }
  .orange{
    color: #ff9852;
  }
  .backLayout{
    margin-top: 60px;
    margin-left: 210px;
    overflow: auto;
    padding: 30px
  }
</style>
