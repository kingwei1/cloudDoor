<template id="tableList">
<el-table :data="tableData" :header-cell-style="headerColor" :cell-style="cellStyle">
  <el-table-column label="头像" v-if="headimg" align="center" width="130">
    <!-- <img :src="tableData.headimg"> -->
    <template slot-scope="scope">
      <div><img :src="tableData[scope.$index].headimg" style="width: 40px;"></div>
    </template>
  </el-table-column>
  <el-table-column v-for="title in titles" :prop="title.prop" :width="title.width" :label="title.label" :class-name="title.prop" align='center'>
  </el-table-column>
  <el-table-column label="对技术人员的评价" v-if="evaluate" align="center" width="200">
    <!-- <img :src="tableData.headimg"> -->
    <template slot-scope="scope">
      <div style="position: relative;">
        <el-input type="textarea" :rows='4' v-model="tableData[scope.$index].value" maxlength='300'></el-input>
        <span style="position: absolute;right: 10px;bottom: 0;margin-top: 10px;">{{tableData[scope.$index].value.length}}/300</span>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="是否置顶" v-if="bbs" align="center" width="100">
    <template slot-scope="scope">
      <div v-if="tableData[scope.$index].top==true">
        <img src="../../assets/istop.png" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="封面" v-if="bbs" align="center" width="150">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].page" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="是否显示" v-if="bbsManage" align="center" width="100">
    <template slot-scope="scope">
      <div v-if="tableData[scope.$index].top==true">
        <img src="../../assets/istop.png" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="相关" v-if="bbs" align="center" width="200">
    <template slot-scope="scope">
      <div>
        <div>收藏：{{tableData[scope.$index].collect}}</div>
        <div>阅读：{{tableData[scope.$index].read}}</div>
        <div>评论：{{tableData[scope.$index].mss}}</div>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="轮播图" v-if="homeManage" align="center" width="150">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].banner" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="项目封面" v-if="homeManage2" align="center" width="150">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].project" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="企业logo" v-if="homeManage3" align="center" width="100">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].logo" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="帖子封面" v-if="homeManage4" align="center" width="150">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].project" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="资讯封面" v-if="homeManage5" align="center" width="150">
    <template slot-scope="scope">
      <div class="page">
        <img :src="tableData[scope.$index].project" />
      </div>
    </template>
  </el-table-column>
  <el-table-column label="操作" v-if="operate" align="center" width="130">
    <template slot-scope="scope">
      <div v-if="flag=='systemSetup'">
        <el-button plain size='mini' @click='auditInfo(scope.$index, scope.row)'>编辑信息</el-button>
        <router-link :to="{path:'/editAuthority',query:{id:tableData[scope.$index].id}}">
          <el-button plain size='mini'>编辑权限</el-button>
        </router-link>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='禁用'" @click="roleManage(scope.row)">启用</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='正常'" @click="roleManage(scope.row)">禁用</el-button>
      </div>
      <div v-if="flag=='UserListAdmin'">
        <el-button plain size='mini' @click="accountManage('身份授权',tableData[scope.$index].aid)">身份授权</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='禁用'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">启用</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='正常'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">禁用</el-button>
        <el-button plain size='mini' @click="resetPassward(tableData[scope.$index].aid)">重置密码</el-button>
      </div>
      <div v-if="flag=='UserList'">
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='禁用'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">启用</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='正常'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">禁用</el-button>
        <el-button plain size='mini' @click="resetPassward(tableData[scope.$index].aid)">重置密码</el-button>
      </div>
      <div v-if="flag=='UserListCompany'">
        <router-link :to="{path:'/viewAccount',query:{aid:tableData[scope.$index].aid}}">
          <el-button plain size='mini'>查看账号</el-button>
        </router-link>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='禁用'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">启用</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='正常'" @click="accountManage(tableData[scope.$index].status,tableData[scope.$index].aid)">禁用</el-button>
        <el-button plain size='mini' @click="resetPassward(tableData[scope.$index].aid)">重置密码</el-button>
      </div>
      <div v-if="flag=='companyAccountList'">
        <router-link :to="{path:'/reviewCompanyAccount',query:{status:tableData[scope.$index].status,id:tableData[scope.$index].id}}" v-if="tableData[scope.$index].status=='待审核'">
          <el-button plain size='mini'>审核</el-button>
        </router-link>
        <router-link :to="{path:'/reviewCompanyAccount',query:{status:tableData[scope.$index].status,id:tableData[scope.$index].id}}" v-if="tableData[scope.$index].status=='已通过'||tableData[scope.$index].status=='未通过'">
          <el-button plain size='mini'>查看明细</el-button>
        </router-link>
      </div>
      <div v-if="flag=='addProject'">
        <el-button plain size='mini' @click="editStation(scope.$index,scope.row,'修改岗位')">修改</el-button>
        <el-button plain size='mini' @click="editStation(scope.$index,scope.row,'删除岗位')">删除</el-button>
      </div>
      <div v-if="flag=='projectManage'">
        <router-link :to="{path:'/addProject',query:{state:tableData[scope.$index].status,id:tableData[scope.$index].id}}">
          <el-button plain size='mini' v-if="tableData[scope.$index].status!='未通过'">明细</el-button>
        </router-link>
        <router-link :to="{path:'/addProject',query:{state:tableData[scope.$index].status,id:tableData[scope.$index].id}}">
          <el-button plain size='mini' v-if="tableData[scope.$index].status=='未通过'">重新提交</el-button>
        </router-link>
        <router-link :to="{path:'/applyRecruits',query:{id:tableData[scope.$index].id,state:'edit'}}">
          <el-button plain size='mini' v-if="tableData[scope.$index].status=='进行中'||tableData[scope.$index].status=='已完成'">招聘申请</el-button>
        </router-link>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='进行中'" @click="finishProject(scope.$index,scope.row)">完成项目</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='已完成'" @click="viewEvaluate(scope.$index,scope.row)">查看评价</el-button>
      </div>
      <div v-if="flag=='projectSortManage'">
        <el-button plain size='mini' @click="editType(scope.$index,scope.row)">修改</el-button>
        <el-button plain size='mini' @click="change(tableData[scope.$index].status,tableData[scope.$index].id)" v-if="tableData[scope.$index].status=='已显示'">隐藏</el-button>
        <el-button plain size='mini' @click="change(tableData[scope.$index].status,tableData[scope.$index].id)" v-if="tableData[scope.$index].status=='已隐藏'">显示</el-button>
      </div>
      <div v-if="flag=='applyList'">
        <el-button plain size='mini' @click="viewResume(scope.$index,scope.row)">查看简历</el-button>
        <el-button plain size='mini' type="primary" @click="change('同意',tableData[scope.$index].id)" v-if="tableData[scope.$index].status=='待确认' && tableData[scope.$index].editable== true">同意</el-button>
        <el-button plain size='mini' type="danger" @click="change('拒绝',tableData[scope.$index].id)" v-if="tableData[scope.$index].status=='待确认' && tableData[scope.$index].editable== true">拒绝</el-button>
      </div>
      <div v-if="flag=='reviewProjectLsit'">
        <router-link :to="{path:'/projectDetail',query:{id:tableData[scope.$index].id}}">
          <el-button plain size='mini'>明细</el-button>
        </router-link>
        <router-link :to="{path:'/applyRecruits',query:{id:tableData[scope.$index].id,state:'see'}}">
          <el-button plain size='mini' v-if="tableData[scope.$index].status=='已通过' || tableData[scope.$index].status=='已完成'">招聘申请</el-button>
        </router-link>
        <el-button plain size='mini' type="primary" v-if="tableData[scope.$index].status=='待审核'" @click="auditPro('通过',tableData[scope.$index].id)">通过</el-button>
        <el-button plain size='mini' type="danger" v-if="tableData[scope.$index].status=='待审核'" @click="auditPro('拒绝',tableData[scope.$index].id)">拒绝</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status=='已通过' || tableData[scope.$index].status=='已完成'" @click="viewEvaluate(scope.$index,scope.row)">查看评价</el-button>
        <el-button plain size='mini' type="primary" v-if="(tableData[scope.$index].status=='已通过' || tableData[scope.$index].status=='已完成') && tableData[scope.$index].isShow== 0" @click="auditPro('隐藏',tableData[scope.$index].id)">已显示</el-button>
        <el-button plain size='mini' type="danger" v-if="(tableData[scope.$index].status=='已通过' || tableData[scope.$index].status=='已完成') && tableData[scope.$index].isShow== 1" @click="auditPro('显示',tableData[scope.$index].id)">已隐藏</el-button>
      </div>
      <div v-if="flag=='bbs'">
        <router-link to="/bbsDetail">
          <el-button plain size='mini'>查看</el-button>
        </router-link>
        <el-button plain size='mini' @click="deleteList(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='bbsManage'">
        <el-button plain size='mini' @click="editBbs(scope.$index,scope.row)">编辑</el-button>
        <el-button plain size='mini' @click="deleteModel(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='homeManage'">
        <el-button plain size='mini' @click="editImgInfo(scope.$index,scope.row)">编辑</el-button>
        <el-button plain size='mini' @click="deleteImgInfo(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='homeManage2'">
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'编辑项目')">编辑</el-button>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'删除项目')">删除</el-button>
      </div>
      <div v-if="flag=='homeManage3'">
        <el-button plain size='mini' @click="editCompany(scope.$index,scope.row)">编辑</el-button>
        <el-button plain size='mini' @click="deleteCompany(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='homeManage4'">
        <el-button plain size='mini' @click="editNews(scope.$index,scope.row)">编辑</el-button>
        <el-button plain size='mini' @click="deleteModel(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='homeManage5'">
        <router-link :to="{path:'/addInformation',query:{type:'edit',id:tableData[scope.$index].id}}">
          <el-button plain size='mini'>编辑</el-button>
        </router-link>
        <el-button plain size='mini' @click="deleteModel(scope.$index,scope.row)">删除</el-button>
      </div>
      <div v-if="flag=='informationList'">
        <el-button plain size='mini' @click="editNewsType(scope.$index,scope.row)">编辑</el-button>
      </div>
      <div v-if="flag=='opinionClassification'">
        <el-button v-if="tableData[scope.$index].status == '启用'" type="danger" size='mini' @click="changeOpinionStatus(tableData[scope.$index].id, false)">禁用</el-button>
        <el-button v-else size='mini' @click="changeOpinionStatus(tableData[scope.$index].id, true)">启用</el-button>
        <el-button plain size='mini' @click="editOpinionType(tableData[scope.$index].id, tableData[scope.$index].name)">编辑</el-button>
      </div>
      <div v-if="flag=='jobManage'">
        <el-button plain size='mini' @click="editJob(scope.$index,scope.row)">编辑</el-button>
        <el-button v-if="tableData[scope.$index].status=='正常'" plain size='mini' @click="stopJob(scope.$index,scope.row)">禁用</el-button>
        <el-button v-if="tableData[scope.$index].status=='禁用'" plain size='mini' @click="starJob(scope.$index,scope.row)">启用</el-button>
      </div>
      <div v-if="flag=='managerAudit-pending'">
        <router-link :to="{path:'/manageInformation',query:{state:'see',id:tableData[scope.$index].id}}">
          <el-button plain size='mini' @click="editJob(scope.$index,scope.row)">查看个人信息</el-button>
        </router-link>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'同意')">同意</el-button>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'拒绝')">拒绝</el-button>
      </div>
      <div v-if="flag=='managerAudit-pass'">
        <router-link :to="{path:'/manageInformation',query:{state:'alter',id:tableData[scope.$index].id}}">
          <el-button plain size='mini' @click="editJob(scope.$index,scope.row)">修改</el-button>
        </router-link>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'禁用')" v-if="tableData[scope.$index].accountStatus== 1">禁用</el-button>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'启用')" v-if="tableData[scope.$index].accountStatus== 0">启用</el-button>
      </div>
      <div v-if="flag=='managerAudit-no_pass'">
        <router-link :to="{path:'/manageInformation',query:{state:'see',id:tableData[scope.$index].id}}">
          <el-button plain size='mini' @click="editJob(scope.$index,scope.row)">查看个人信息</el-button>
        </router-link>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'删除')">删除</el-button>
      </div>
      <div v-if="flag=='managerAudit1-pending'">
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'同意')">同意</el-button>
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'拒绝')">拒绝</el-button>
      </div>
      <div v-if="flag=='managerAudit1-pass'">
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'禁用')">禁用</el-button>
      </div>
      <div v-if="flag=='managerAudit1-no_pass'">
        <el-button plain size='mini' @click="operation(scope.$index,scope.row,'启用')">启用</el-button>
      </div>
      <div v-if="flag=='enterpriseCooperation'">
        <el-button plain size='mini' v-if="tableData[scope.$index].status == '已回复'" @click="seeReply(tableData[scope.$index].id, '意见详情')">查看详情</el-button>
        <el-button plain size='mini' v-if="tableData[scope.$index].status == '未回复'" @click="reply(tableData[scope.$index].id, '回复')">回复</el-button>
      </div>
      <!--<div v-if="flag=='friendshipLink'">
					<el-button plain size='mini' @click="editfriend(scope.$index,scope.row)">编辑</el-button>
			  		<el-button plain size='mini' @click="editNews(scope.$index,scope.row)">删除</el-button>
			</div>-->
    </template>
  </el-table-column>
</el-table>
</template>
<script>
export default {
  name: 'tableList',
  props: ['tableData', 'titles', 'flag', 'operate', 'headimg', 'evaluate', 'bbs', 'bbsManage', 'homeManage', 'homeManage2', 'homeManage3', 'homeManage4', 'homeManage5'],
  data() {
    return {

    }
  },
  methods: {
    headerColor(row, rowIndex) {
      return 'background:	#D4D4D4;color:#6E6D6E';
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.className == 'status' && (row.row.status == '正常' || row.row.status == '已通过' || row.row.status == '已完成' || row.row.status == '已发布' || row.row.status == '可用' || row.row.status == '已联系' || row.row.status == '已回复')) {
        return 'color:#3ea63d'
      } else if (row.column.className == 'status' && (row.row.status == '禁用' || row.row.status == '未通过' || row.row.status == '未发布' || row.row.status == '未联系' || row.row.status == '未回复')) {
        return 'color:red'
      } else if (row.column.className == 'status' && (row.row.status == '待审核' | row.row.status == '待确认')) {
        return 'color:#ff9800'
      } else if (row.column.className == 'status' && row.row.status == '进行中') {
        return 'color:#3397fc'
      } else if (row.column.className == 'status' && row.row.status == '已启用') {
        return 'color:#3397fc'
      } else if (row.column.className == 'status' && row.row.status == '已禁用') {
        return 'color:red'
      } else if (row.column.className == 'status' && row.row.status == '已显示') {
        return 'color:#3ea63d'
      } else if (row.column.className == 'status' && row.row.status == '已隐藏') {
        return 'color:#ff9800'
      }
    },
    change(status, id) {
      this.$emit('open', status, id)
    },
    auditInfo(index, row) {
      let flag = '编辑角色基本信息';
      this.$emit('open', row.id, flag, row.name, row.describe)
    },
    editStation(index, row, flag) {
      this.$emit('open', row.id, flag, row.stationName, row.stationIntroduce, row.recruitsNumber)
    },
    viewResume(index, row) {
      let flag = '申请人简历';
      this.$emit('open', flag, row.id)
    },
    viewEvaluate(index, row) {
      let flag = '查看评价';
      this.$emit('open', row.id, flag)
    },
    finishProject(index, row) {
      let flag = '完成项目';
      this.$emit('open', row.id, flag)
    },
    auditPro(state, id) {
      this.$emit('auditPro', state, id)
    },
    deleteList(index, row) {
      let flag = '帖子列表删除提示';
      this.$emit('open', row.id, flag);
    },
    deleteType(index, row) {
      let flag = '删除分类';
      this.$emit('open', row.id, flag);
    },
    editNews(index, row) {
      let flag = '编辑资讯';
      this.$emit('open', row, flag);
    },
    changeOpinionStatus(id, status) {
      // 启用/禁用意见类型
      // id：意见类型的 id
      // status：true，启用，false：禁用
      this.$emit('changeOpinionStatus', id, status);
    },
    deleteModel(index, row) {
      let flag = '';
      if (this.flag == 'bbsManage') {
        flag = '版块分类删除提示';
      }
      if (this.flag == 'homeManage5') {
        flag = '资讯删除提示';
      }
      this.$emit('open', row.id, flag);
    },
    editBbs(index, row) {
      let flag = '编辑版块分类';
      this.$emit('edit', row.id, flag);
    },
    editType(index, row) {
      let flag = '修改分类';
      this.$emit('edit', flag, row);
    },
    editNewsType(index, row) {
      let flag = '编辑资讯分类';
      this.$emit('edit', row.id, flag, row.title);
    },
    editOpinionType(id, type) {
      let flag = '编辑意见类型';
      this.$emit('editOpinionType', id, type);
    },
    editfriend(index, row) {
      let flag = '编辑友情链接';
      this.$emit('edit', row.id, flag, row.title);
    },
    editJob(index, row) {
      let flag = '编辑期望职业';
      this.$emit('edit', row.id, flag);
    },
    editImgInfo(index, row) {
      let flag = '编辑轮播图';
      this.$emit('edit', row, flag)
    },
    editCompany(index, row) {
      let flag = '编辑企业墙';
      this.$emit('edit', row, flag)
    },
    deleteImgInfo(index, row) {
      let flag = '删除轮播图';
      this.$emit('edit', row, flag)
    },
    operation(index, row, state) {
      this.$emit('operation', row, state)
    },
    accountManage(status, aid) {
      this.$emit('accountManage', status, aid)
    },
    deleteCompany(index, row) {
      this.$confirm('确认删除该企业？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        this.$emit('deleteCompany', row.id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    roleManage(row) {
      this.$emit('changeState', row)
    },
    reply(id, flag) {
      this.$emit('open', id, flag)
    },
    seeReply(id, flag) {
      this.$emit('open', id, flag);
    },
    resetPassward(account) {
      let that = this;
      const token = localStorage.getItem('token');
      this.$confirm('是否确认把‘' + '<span style="color:#FF9800">' + account + '</span>' + '’的密码初始化', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$baseUrl + '/user/initPassword?aid=' + account + '&token=' + token)
          .then(function(res) {
            that.$message({
              type: 'success',
              message: '密码已初始化为000000!'
            });
          })
          .catch(function(err) {
            console.log(err)
          })
      }).catch((err) => {
        console.log(err)
        that.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    stopJob(index, row) {
      this.$confirm('是否禁用该职业', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        const token = localStorage.getItem('token')
        let that = this;
        let formData = new FormData();
        formData.append('id', row.id)
        formData.append('operation', false)
        this.$axios({
            url: this.$baseUrl + '/career/career/career/status?token=' + token,
            method: 'post',
            data: formData
          })
          .then(function(res) {
            that.$message({
              type: 'success',
              message: '禁用成功'
            })
            that.show = false;
            that.$emit('refresh')
          })
          .catch(function(err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    starJob(index, row) {
      this.$confirm('是否启用该职业', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        const token = localStorage.getItem('token')
        let that = this;
        let formData = new FormData();
        formData.append('id', row.id)
        formData.append('operation', true)
        this.$axios({
            url: this.$baseUrl + '/career/career/career/status?token=' + token,
            method: 'post',
            data: formData
          })
          .then(function(res) {
            that.$message({
              type: 'success',
              message: '启用成功'
            })
            that.show = false;
            that.$emit('refresh')
          })
          .catch(function(err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

  }
}
</script>
<style scoped>
.el-button {
  display: block;
  margin: 5px auto !important;
}

.page img {
  width: 100%;
}
</style>
<style >
.el-table th>.cell {
  text-align: center;
}

.el-table .cell {
  white-space: pre-line !important;
}
</style>
