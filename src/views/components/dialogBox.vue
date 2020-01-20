<template>
<div id="dialogBox">
  <el-dialog v-if="flag=='访问论坛明细'" :title="'访问论坛明细'" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
    <div class="point">请下载"大学了没"app</div>
    <div class="coding">
      <img src="../../assets/coding.png" />
    </div>
    <div class="point">扫描二维码下载app</div>
    <span slot="footer" class="dialog-footer">
      <!--<el-button type="primary" round>确认选择</el-button>-->
      <!--<el-button @click="close()" round="" type="info">取 消</el-button>-->
    </span>
  </el-dialog>
  <el-dialog v-if="flag=='登录提示'" :title="datas.title" :visible="dialogVisible" :before-close="handleClose" width="30%">
    <div class="message">{{datas.msg}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="login" round v-if="datas.msg!='您不是学生，无权访问'">去登陆</el-button>
      <el-button type="primary" @click="close('close')" round v-if="datas.msg=='您不是学生，无权访问'">知道了</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='项目岗位申请'||flag=='查看申请信息'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="bold">个人基本信息</div>
    <div class="form">
      <div><span>头像</span><span><img :src="datas.face" class="face" /></span></div>
      <div><span>姓名</span><span>{{datas.name}}</span></div>
      <div><span>联系方式</span><span>{{datas.phone}}</span></div>
      <div><span>性别</span><span>{{datas.sex}}</span></div>
      <div><span>所属学校</span><span>{{datas.graduation}}</span></div>
      <div><span>专业</span><span>{{datas.major}}</span></div>
      <div><span>年级</span><span>{{datas.class}}</span></div>
      <div><span>邮箱</span><span>{{datas.email}}</span></div>
      <hr>
      <div style="position: relative;"><span>自我评价</span>
        <span>
          <el-input v-if="datas.flag==false" type="textarea" :rows="6" placeholder="请输入内容" v-model="datas.textarea" maxlength='500' resize='none'></el-input>
          <span v-if="datas.flag==false" style="position: absolute;right: 20px;bottom: 0;">{{datas.textarea.length}}/500</span>
          <span v-if="datas.flag==true">{{datas.textarea}}</span>
        </span>
      </div>
      <div v-if="datas.flag==true"><span>提交时间</span><span>{{datas.addTime}}</span></div>
    </div>
    <span slot="footer" class="dialog-footer" v-if="datas.flag==false">
      <el-button type="primary" round @click='sumit()'>提交申请</el-button>
      <el-button @click="close()" round="" type="info">返 回</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='企业评价'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="form">
      <div><span>所在企业</span><span>{{datas.company}}</span></div>
      <div><span>所在岗位</span><span>{{datas.job}}</span></div>
      <div><span>岗位申请时间</span><span>{{datas.applyTime}}</span></div>
      <div><span>上岗时间</span><span>{{datas.startTime}}</span></div>
      <div><span>企业评价时间</span><span>{{datas.evaluateTime}}</span></div>
      <hr>
      <div><span>企业评价</span><span>{{datas.evaluate}}</span></div>
    </div>
  </el-dialog>
  <el-dialog v-else-if="flag=='提醒'" title=" " :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
    <div class="reset">
      <div><img src="../../assets/right.png" /></div>
      <div>密码重置成功！</div>
      <div>请妥善保管好您的密码，以免泄露和丢失</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close()">确定</el-button>
    </span>
  </el-dialog>

  <el-dialog v-else-if="flag=='创建角色'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>角色名称</span>
      <el-input v-model="datas.roleName"></el-input>
    </div>
    <div class="formBox"><span>角色描述</span>
      <el-input type='textarea' :rows='5' v-model="datas.roleDescribe"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createRole">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑版块分类'||flag=='添加版块分类'" :title="flag" :visible.sync="dialogVisible" width="480px" :before-close="handleClose">
    <div class="formBox"><span>版块分类名称</span>
      <el-input placeholder="请输入版块分类名称" v-model="datas.name"></el-input>
    </div>
    <div class="formBox"><span>是否显示</span>
      <div class="radio">
        <el-radio v-model="datas.show" label="1">备选项</el-radio>
        <el-radio v-model="datas.show" label="2">备选项</el-radio>
      </div>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input placeholder="请输入排序" v-model="datas.sort"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close()">保存</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='修改分类'||flag=='添加分类'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>分类名称</span>
      <el-input placeholder="请输入分类名称" v-model="datas.name"></el-input>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input-number v-model="datas.sorts" :min='0' :max='99'></el-input-number>
    </div>
    <div class="formBox"><span></span><span style="width:200px;color: #ff9800;font-size: 12px">注：（0-99）数值越大越排在前面</span></div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="newsType(flag)">保存</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑资讯分类'||flag=='添加资讯分类'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>资讯分类名称</span>
      <el-input placeholder="请输入资讯分类名称" v-model="datas.name" :maxlength="10"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="newsType(flag)">确认</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑友情链接'||flag=='添加友情链接'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>友情链接名称</span>
      <el-input placeholder="请输入资讯分类名称" v-model="datas.name" :maxlength="10"></el-input>
    </div>
    <div class="formBox"><span>跳转URL</span>
      <el-input placeholder="请输入链接" v-model="datas.name" :maxlength="10"></el-input>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="99"></el-input-number>
    </div>
    <p style="color:#ff9800">*排序值0-99，排序值越大，前端显示的越靠前</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="newsType(flag)">确认</el-button>
      <!--editfriend-->
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑期望职业'||flag=='添加期望职业'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>期望职业</span>
      <el-input placeholder="请输入期望职业名称" v-model="datas.name"></el-input>
    </div>
    <div class="formBox"><span>期望职能</span>
      <el-input type="textarea" placeholder="请输入期望职能" v-model="datas.content" :rows="3"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addCreer(flag)">确认</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑角色基本信息'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>角色名称</span>
      <el-input v-model="datas.roleName2"></el-input>
    </div>
    <div class="formBox"><span>角色描述</span>
      <el-input type='textarea' :rows='5' v-model="datas.roleDescribe2"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editRole()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='添加岗位'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>岗位名称</span>
      <el-input v-model="datas.stationName"></el-input>
    </div>
    <div class="formBox"><span>岗位介绍</span>
      <el-input type='textarea' :rows='5' v-model="datas.stationIntroduce"></el-input>
    </div>
    <div class="formBox"><span>招聘人数</span>
      <el-input-number v-model="datas.recruitsNumber" :max='100' :min='1' label="描述文字"></el-input-number>
    </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumit('添加岗位')">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='修改岗位'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>岗位名称</span>
      <el-input v-model="datas.stationName1"></el-input>
    </div>
    <div class="formBox"><span>岗位介绍</span>
      <el-input type='textarea' :rows='5' v-model="datas.stationIntroduce1"></el-input>
    </div>
    <div class="formBox"><span>招聘人数</span>
      <el-input-number v-model="datas.recruitsNumber1" :max='100' :min='1'></el-input-number>
      </el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumit('修改岗位')">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='申请人简历'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBoxOne"><span>头像</span><span><img :src="datas.img" style="width: 100px;"></span></div>
    <div class="formBoxOne"><span>姓名</span><span>{{datas.name}}</span></div>
    <div class="formBoxOne"><span>联系方式</span><span>{{datas.contect}}</span></div>
    <div class="formBoxOne"><span>性别</span><span>{{datas.sex}}</span></div>
    <div class="formBoxOne"><span>所属学校</span><span>{{datas.school}}</span></div>
    <div class="formBoxOne"><span>专业</span><span>{{datas.major}}</span></div>
    <div class="formBoxOne"><span>年级</span><span>{{datas.grade}}</span></div>
    <div class="formBoxOne"><span>邮箱</span><span>{{datas.email}}</span></div>
    <div class="formBoxOne"><span>自我评价</span><span>{{datas.evaluate}}</span></div>
  </el-dialog>
  <el-dialog v-else-if="flag=='查看评价'" :title="flag" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
    <tableList :tableData="datas.tableData" :titles="datas.titles" flag='evaluate'></tableList>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close()">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='完成项目'" :title="flag" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
    <tableList :tableData="datas.tableData2" :titles="datas.titles2" flag='finishProject' evaluate='true'></tableList>
    <span style="color:#ff9800 ;">注：请确认无误后完成操作，项目完成后将无法更改项目信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitChange()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='添加轮播图'||flag=='编辑轮播图'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>轮播图</span>
      <upload ref="upload" @changeImg="changeImg" flag='rotationChart'></upload>
    </div>
    <div class="formBox"><span>标题</span>
      <el-input v-model="datas.title"></el-input>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input-number v-model="datas.sort" :min="0" :max="100" label="描述文字"></el-input-number>
    </div>
    <div class="formBox"><span>跳转链接</span>
      <el-input v-model="datas.href"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitImgInfo(flag)">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='编辑企业墙' || flag=='添加企业墙'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>企业logo</span>
      <upload ref="upload" @changeImg="changeImg" flag='btn'></upload>
    </div>
    <div class="formBox"><span>企业名称</span>
      <el-input v-model="datas.name"></el-input>
    </div>
    <div class="formBox"><span>企业介绍</span>
      <el-input type='textarea' rows="4" v-model="datas.introduce"></el-input>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input-number v-model="datas.sort2" :min="0" :max="100" label="描述文字"></el-input-number>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitCompany(flag)">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='添加资讯' || flag=='编辑资讯'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>资讯名称</span>
      <el-select v-model="datas.nname" @change="onSelectedDrug($event)">
        <el-option v-for="n in news" :value="n.name">
        </el-option>
      </el-select>
    </div>
    <div class="formBox">
      <span>排序</span>
      <el-input-number v-model="datas.newsSort" :min="0" :max="99" label="0-99"></el-input-number>
    </div>
    <p style="color:#ff9800">*排序值0-99，排序值越大，前端显示的越靠前</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitNews(flag)">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='账号身份授权'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <el-checkbox style='margin:10px' v-for="data in datas" :label="data.id" :key="data.id" :disabled="data.isSystem == 1" v-model="data.isChosen">{{data.roleName}}</el-checkbox>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitChange()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag=='添加项目' || flag=='编辑项目'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <div class="formBox"><span>校企合作项目</span>
      <el-select v-model="datas.name" v-if="flag=='添加项目'" @change="changeProject($event)" style="width: 300px;">
        <el-option v-for="n in datas.data" :value="n.name">
        </el-option>
      </el-select>
      <p v-if="flag !='添加项目'">{{datas.name}}</p>
    </div>
    <div class="formBox"><span>发布企业</span>
      <p>{{datas.enterpriseName}}</p>
    </div>
    <div class="formBox"><span>排序</span>
      <el-input-number v-model="datas.weight" :min="0" :max="99" label="描述文字"></el-input-number>
    </div>
    <p style="color:#ff9800">*排序值0-99，排序值越大，前端显示的越靠前</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitNews(flag)">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog v-else-if="flag == '回复' || flag == '意见详情'" :title="flag" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
    <div class="opinionContent" v-if="flag == '意见详情' || flag == '回复'">
      <el-row>
        <el-col :span="24">
          <el-col :span="4">
            <div class="opinion-label">状态：</div>
          </el-col>
          <el-col :span="20">
            <div :style="{'color': datas.status == '已回复' ? 'green' : 'red'}">{{datas.status}}</div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="4">
            <div class="opinion-label">回复内容：</div>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" :class="flag == '回复' ? 'myTextArea' : 'myTextArea2'" resize="none" :autosize="flag == '回复' ? false : true" :rows="5" :readonly="flag == '回复' ? false : true"
            :placeholder="flag == '回复' ? '请输入...' : ''" v-model="datas.reply"></el-input>
            <div class="imgContent">
              <el-row>
                <el-col :span="8" v-for="url in imgs">
                  <div class="imgBox" @click="openBigImageDialog(url, imgs)">
                    <img class="opinionImg" :src="url">
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="4">
            <div class="opinion-label">意见内容：</div>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" class="myTextArea2" resize="none" :autosize="true" :rows="5" :readonly="true" placeholder="" v-model="datas.content"></el-input>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="4">
            <div class="opinion-label">联系方式：</div>
          </el-col>
          <el-col :span="20">{{datas.contact}}</el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="4">
            <div class="opinion-label">相关页面地址：</div>
          </el-col>
          <el-col :span="20">{{datas.remarks}}</el-col>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" v-if="flag == '回复'" class="dialog-footer mt10px">
      <el-button type="primary" @click="reply()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </div>
  </el-dialog>
	  <el-dialog v-else-if="flag=='校企项目讨论区查看回复'"
										title="查看回复"
										:visible.sync="dialogVisible"
									width="600px"
										:before-close="handleClose">
						<h4>{{datas.length}}条回复</h4>
						<div class="userEva" v-for="(eva,index) in datas">
								<div class="item"><img :src="eva.avatarUrl" class="userface"/>
							<div class="userDetail">
								<span>{{eva.name}} : {{eva.content}}</span>
								</div>
								<div style="position: absolute;bottom: 0;right: 0;" >
							   <div style="display: inline-block;">{{eva.date}}</div>
								   <div :class="{good:eva.isGood,nogood:!eva.isGood}" style="display: inline-block;width: 50px;margin-left: 20px;" @click="likeIt(eva.id,eva.isGood)">{{eva.postTotal}}</div>
							</div>
							</div>

					</div>
			</el-dialog>
  <el-dialog v-else-if="flag == '添加意见类型' || flag == '编辑意见类型'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <el-row>
      <el-col :span="4">
        <span style="line-height: 40px; font-size: 16px;">意见类型：</span></el-col>
      <el-col :span="20">
        <div v-if="flag == '添加意见类型'">
          <el-input placeholder="请输入意见类型" v-model="opinionType"></el-input>
        </div>
        <div v-else>
          <el-input placeholder="请输入意见类型" v-model="oldOpinionType"></el-input>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitNewType()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </div>
  </el-dialog>
  <el-dialog v-else-if="flag == '意见反馈'" :title="flag" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
    <el-row class="text-left">
      <el-col :span="4">
        <span class="input-label">意见类型：</span>
      </el-col>
      <el-col :span="19">
        <el-select style="width: 100%;" v-model="selectType" placeholder="请选择类型">
          <el-option v-for="item in datas" :key="item.value" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <div class="input-label text-center">*</div>
      </el-col>
    </el-row>
    <el-row class="text-left mt10px">
      <el-col :span="4">
        <span class="input-label">联系方式：</span>
      </el-col>
      <el-col :span="19">
        <el-input placeholder="请输入联系方式" v-model="contactType">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="text-left mt10px">
      <el-col :span="4">
        <span class="input-label">内容：</span></el-col>
      <el-col :span="19">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="opinionContent">
        </el-input>
      </el-col>
      <el-col :span="1">
        <div class="input-label text-center">*</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitNewOpinion()">提交</el-button>
      <el-button type="info" @click="close()">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import tableList from '../components/tableList'
import upload from '../components/upload'
export default {
  name: "dialog-box",
  components: {
    tableList,
    upload
  },
  props: ['flag', 'dialogVisible', 'datas', 'acceptOpinionType', 'imgs'],
  data() {
    return {
      changeImgState: 0,
      news: [],
      newsId: 0,
      opinionType: null, // 意见类型
      oldOpinionType: this.acceptOpinionType,
      opinionContent: null,
      contactType: null,
      selectType: null,
    }
  },
  watch: {
    acceptOpinionType(val) {
      this.oldOpinionType = val;
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    openBigImageDialog(current, imgs) {
      this.$emit('openBigImageDialog', current, imgs);
    },
    close(type) {
      this.$emit('close', type);
    },
    newsType(flag) {
      this.$emit('newsType', flag)
    },
    submitChange() {
      this.$emit('submitChange')
    },
    reply() {
      this.$emit('reply', this.datas.reply);
    },
    changeImg() {
      this.changeImgState = 1
    },
    login() {
      this.$emit('login')
    },
    sumit(flag) {
      this.$emit('submitChange', flag)
    },
    likeIt(id, flag) {
      this.$emit('likeIt', id, flag)
    },
    submitNewOpinion() {
      this.$emit('submitNewOpinion', this.selectType, this.contactType, this.opinionContent);
    },
    submitImgInfo(flag) {
      if (flag == '添加轮播图') {
        const token = localStorage.getItem('token')
        this.$refs.upload.upload(token).then((value) => {
          this.$emit('submitImgInfo', value, flag)
        })
      }
      if (flag == '编辑轮播图' && this.changeImgState == 1) {
        const token = localStorage.getItem('token')
        this.$refs.upload.upload(token).then((value) => {
          this.$emit('submitImgInfo', value, flag)
        })
      }
      if (flag == '编辑轮播图' && this.changeImgState == 0) {
        this.$emit('submitImgInfo', undefined, flag)
      }


    },
    submitCompany(flag) {
      if (flag == '编辑企业墙' && this.changeImgState == 1) {
        const token = localStorage.getItem('token')
        this.$refs.upload.upload(token).then((value) => {
          this.$emit('submitCompany', value, flag)
        })
      }
      if (flag == '添加企业墙') {
        const token = localStorage.getItem('token')
        this.$refs.upload.upload(token).then((value) => {
          this.$emit('submitCompany', value, flag)
        })
      }
      if (flag == '编辑企业墙' && this.changeImgState == 0) {
        this.$emit('submitCompany', undefined, flag)
      }
    },
    dialogGetOldImg(oldImg) {
      this.$refs.upload.getOldImg(oldImg)
    },
    dialogGetNews() {
      const token = localStorage.getItem('token');
      let that = this;
      this.$axios.get(this.$baseUrl + '/news/getTitles?token=' + token, {})
        .then(function(res) {
          let data = res.data.data;
					that.news = [];
          data.forEach(function(value, index, array) {
            that.news.push({
              name: value.title,
              id: value.id,
              sort: value.sort
            })
          })
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    changeProject(even) {
      for (var i = 0; i < this.datas.data.length; i++) {
        if (this.datas.data[i].name == even) {
          this.datas.enterpriseName = this.datas.data[i].enterpriseName;
          this.datas.pictureUrl = this.datas.data[i].pictureUrl;
          this.datas.id = this.datas.data[i].id;
          this.datas.auditTime = this.datas.data[i].auditTime;
          break
        }
      }
    },
    onSelectedDrug(even) {
      for (var i = 0; i < this.news.length; i++) {
        if (this.news[i].name == even) {
          this.datas.newsSort = this.news[i].sort
          this.newsId = this.news[i].id
        }
      }
    },
    submitNews(flag) {
      if (flag == '添加资讯') {
        this.$emit('addNews', this.newsId)
      }
      if (flag == '添加项目' || flag == '编辑项目') {
        this.$emit('saveProject', flag)
      }
    },
    createRole() {
      this.$emit('createRole')
    },
    submitNewType() {
      let val;
      if (this.flag == '添加意见类型') {
        val = this.opinionType;
      } else if (this.flag == '编辑意见类型') {
        val = this.oldOpinionType;
      }
      this.$emit('submitNewType', val);
    },
    editRole() {
      this.$emit('editRole')
    },
    addCreer(flag) {
      this.$emit('submit', flag)
    }
  },
  created: function() {
  }
}
</script>

<style scoped>
.mt10px {
  margin-top: 10px;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
  ;
}

.input-label {
  line-height: 40px;
  font-size: 16px;
}

.point {
  font-size: 18px;
  text-align: center;
}

.bold {
  font-weight: bolder;
  font-size: 16px;
  padding-bottom: 20px;
}

.coding {
  text-align: center;
  padding: 20px 0;
}

.form span {
  display: inline-block;
  padding: 8px 0;
}

.form div>span:nth-child(1) {
  width: 20%;
  vertical-align: top;
}

.form div>span:nth-child(2) {
  width: 78%;
}

.face {
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.reset {
  text-align: center;
  font-size: 18px;
}

.reset>div {
  padding-bottom: 10px;
}

.formBox {
  overflow: auto;
  margin: 20px 80px;
}

.formBox span {
  display: inline-block;
  width: 100px;
  float: left;
  font-size: 16px;
  padding-top: 8px;
  text-align: left;
}

.formBoxOne span {
  display: inline-block;
  width: 130px;
  float: none;
  font-size: 16px;
  margin-bottom: 20px;
}

.formBoxOne span:nth-child(1) {
  text-align: left;
}

.formBox .el-input,
.el-input-number {
  width: 300px;
  float: left;
}

.formBox .el-textarea {
  width: 300px;
  float: left;
}

.formBox .radio {
  text-align: left;
}

/* 查看回复样式 */
.userEva {
  font-size: 14px;
  border-top: 4px solid #f6f9fd;
}

.userEva:nth-child(2) {
  border-top: 0;
}

.userEva .evaContent {
  font-size: 12px;
  padding: 20px 0 10px 0;
  cursor: pointer;
}

.userEva:hover .useReply {
  display: inline;
}

.userEva .userface,
.userEva .userDetail {
  float: left;
}

.userEva .userDetail>span {
  display: inline-block;
  font-size: 16px;
  padding-top: 8px;
}

.userEva .item {
  overflow: auto;
  padding: 10px 0 20px 0;
  position: relative;
}

.userEva .userface {
  width: 40px;
  height: 40px;
  border-radius: 80px;
  margin-right: 20px;
}

.good {
  background: url("../../assets/good.png") no-repeat;
  background-size: auto 90%;
  /* right: 0px; */
  cursor: pointer;
}

.nogood {
  background: url("../../assets/nogood.png") no-repeat;
  background-size: auto 90%;
  /* right: 0px; */
  cursor: pointer;
}
</style>
<style>
#main .el-dialog {
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
}

#main .el-dialog__wrapper {
  z-index: 1500 !important;
}

.v-modal {
  z-index: 1000 !important;
}

#main .el-dialog__title {
  color: var(--blue);
  font-weight: bolder;
}

#main .el-dialog__header {
  border-bottom: 1px solid #dcdcdc;
  padding: 0;
}

#main .el-dialog__header>span {
  display: inline-block;
  padding: 0 0 15px 0;
  border-bottom: 3px solid var(--blue);
  margin-bottom: -2px;
}

#main .el-dialog__headerbtn .el-dialog__close {
  background: #8c8c8c;
  color: #fff;
  padding: 5px;
  border-radius: 100%;
}

#main .el-dialog__footer {
  padding: 10px 20px;
  border-top:1px solid #dcdcdc;
}

#main .el-dialog__body {
  padding: 20px 0;
  overflow: auto;
  text-align: center;
}

.el-dialog__footer a+a {
  margin-left: 10px;
}

.formBox .el-textarea textarea {
  font-family: '微软雅黑';
}

.opinionContent {
  font-family: '微软雅黑';
  line-height: 25px;
  text-align: left;
  font-size: 16px;
  max-height: 450px;
  overflow: auto;
}

.opinion-label {
  /* font-weight: bold; */
}

.myTextArea textarea {
  padding: 5px;
  background: #fff;
  font-family: '微软雅黑';
  color: #606266;
  line-height: 25px;
  font-size: 16px;
}

.myTextArea2 textarea {
  border: none;
  padding: 0px;
  background: #fff;
  font-family: '微软雅黑';
  color: #606266;
  line-height: 25px;
  font-size: 16px;
}

.dialog-footer {
  text-align: right;
  display: block;
}

.imgContent {
  padding:  10px 0;
}

.imgContent .imgBox {
  height: 100px;
  text-align: center;
  background: #eee;
  margin-right: 10px;
}

.imgContent .imgBox img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
</style>
