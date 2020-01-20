<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/questionsList' }">问题列表</el-breadcrumb-item>
                <el-breadcrumb-item>{{edit}}问题</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="box">
                <div class="item"><span>问题名称</span><span><el-input v-model="datas.title"/></span>
	                <span style="color: #d6c0c1; padding: 10px;">0/50</span>
                </div>
                <div class="item">
                    <span>问题分类</span>
                    <div class="select">
                        <el-select v-model="datas.value" placeholder="请选择一级分类">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="datas.value" placeholder="请选择二级分类">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <span>状态</span>
                    <div class="radio">
                        <el-radio-group v-model="datas.status">
                            <el-radio :label="0">未发布</el-radio>
                            <el-radio :label="1">已发布</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="item">
                	<span>问题内容</span>
                	<span><el-input v-model="datas.description" placeholder="请输入描述" type="textarea" :rows="5"/>
                		
                	</span>
                </div>
                <div class="btnTools"><el-button type="primary" @click="submit" v-if="type=='add'">确认创建</el-button><el-button type="primary" @click="save(changeImgState)" v-if="type=='edit'">保存</el-button><el-button type="warning">取消</el-button></div>
            </div>
        </div>
        <el-upload
          class="upload-demo"
          :action="url"
           multiple
          :auto-upload="true"
          style='display: none'
          :before-upload="beforeUpload"
          :data='uploadData'
          :on-success="success"
          >
          <el-button size="small" type="primary" id='imgInput'>点击上传</el-button>
          <div slot="tip" class="el-upload__tip"style="margin-left: 80px">只能上传jpg/png文件，且不超过500kb</div>
         </el-upload>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import upload from '../components/upload'
    export default {
        name: "add-information",
        components:{
           upload
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
        data(){
            return{
                type:this.$route.query.type,
                id:this.$route.query.id,
                url:this.$baseUrl+'/file/upload',
                imgFile:'',
                uploadData:{},
                datas:{
                    title:'',
                    status:'',
                    value:'',
                    description:'',
                    EditorContent:'',
                    oldImg:[],                  
                },
                oldImgUrl:'',
                options: [],
                created:0,
                publisher:'',
                views:0,
                changeImgState:0,//上传状态，无上传为0，有改变上传为1
            }
        },
        methods:{
            onEditorBlur(editor) {
                console.log('editor blur!', editor);
                console.log( this.datas.EditorContent)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor);
                console.log( this.datas.EditorContent)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
                console.log(123)
            },
            onEditorChange({ editor, html, text }) {
                // console.log('editor change!', editor, html, text)
                this.datas.EditorContent = html;
                console.log(this.datas.EditorContent)
            },
            beforeUpload(file, fileList){
                console.log(file)
                const token=localStorage.getItem('token')
                this.uploadData={
                    file:file,
                    token:token
                }
                console.log(this.uploadData)
            },
            success(response,file,fileList){    
                console.log(response);
                let url='';
                url=this.$pictrueShowUrl+'/data/download/'+response.data.filePath;
                if (url!=null&&url.length>0) {
                   this.editor.insertEmbed(this.editor.getSelection().index,'image',url) 
                }              
            },
            submit(){
                const token=localStorage.getItem('token');
                let that=this;
                this.$refs.upload.upload(token).then((value)=>{
                  that.$axios.post(this.$baseUrl+'/news/create?token='+token,{
                    title:that.datas.title,
                    cid:that.datas.value,
                    coverImg:value.value,
                    description:that.datas.description,
                    content:that.datas.EditorContent,
                    status:parseInt(that.datas.status)
                  })
                  .then(function(res){
                    console.log(res)
                    that.$message({
                        type:'success',
                        message:'添加成功！'
                    })
                    that.$router.push({path:'/informationManage'})
                  })
                  .catch(function(err){
                    console.log(err)
                  })
                })               
            },
            save(state){
                const token=localStorage.getItem('token');
                let that=this;
                if (state==1) {                
                this.$refs.upload.upload(token).then((value)=>{
                  that.$axios.post(this.$baseUrl+'/news/update?token='+token,{
                    id:that.id,
                    title:that.datas.title,
                    cid:that.datas.value,
                    coverImg:value.value,
                    description:that.datas.description,
                    content:that.datas.EditorContent,
                    status:parseInt(that.datas.status),
                    publisher:that.publisher,
                    views:that.views,
                    created:that.created
                  })
                  .then(function(res){
                    console.log(res)
                    that.$message({
                        type:'success',
                        message:'修改成功！'
                    })
                    that.$router.push({path:'/informationManage'})
                  })
                  .catch(function(err){
                    console.log(err)
                  })
                })
                }
                if (state==0) {
                this.$axios.post(this.$baseUrl+'/news/update?token='+token,{
                    id:that.id,
                    title:that.datas.title,
                    cid:that.datas.value,
                    coverImg:that.oldImgUrl,
                    description:that.datas.description,
                    content:that.datas.EditorContent,
                    status:parseInt(that.datas.status),
                    publisher:that.publisher,
                    views:that.views,
                    created:that.created
                  })
                  .then(function(res){
                    console.log(res)
                    that.$message({
                        type:'success',
                        message:'修改成功！'
                    })
                    that.$router.push({path:'/informationManage'})
                  })
                  .catch(function(err){
                    console.log(err)
                  })
                }
               
            },
            changeImg(){
                this.changeImgState=1
            },
            getType(token){
                let that=this;
                this.$axios.get(this.$baseUrl+'/news/category/paged?page=1&size=10&token='+token,{})
                .then(function(res){
                    let data=res.data.data.list;
                    data.forEach(function(value,index,array){
                        that.options.push({
                            value:value.id,
                            label:value.name
                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            getInfo(token){
                let that=this;
                this.$axios.get(this.$baseUrl+'/news/get/'+this.id,{})
                .then(function(res){
                    let data=res.data.data;
                    that.datas={
                    title:data.title,
                    value:data.cid,
                    status:data.status,
                    description:data.description,
                    EditorContent:data.content,
                    oldImg:[{name:'coverImg',url:that.$pictrueShowUrl+'/data/access/'+data.coverImg}]
                }; 
                that.oldImgUrl=data.coverImg;
                that.publisher=data.publisher;
                that.created=data.created;
                that.views=data.views;
                that.$refs.upload.getOldImg(that.datas.oldImg);           
                })
                .catch(function(err){
                    console.log(err)
                })
            },
            imgHandler(){
                let imgInput=document.getElementById('imgInput');
                imgInput.click();
            }
        },
        mounted(){
            this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
            // this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
        },
        created(){
            const token=localStorage.getItem('token');
            this.getType(token);            
            if(this.type=='edit'){
                this.getInfo(token);
                this.edit='编辑';
                
            }else{
                this.edit='添加';
                this.datas={
                    title:'',
                    value:'',
                    status:'',
                    description:'',
                    EditorContent:'',
                    oldImg: [],
                };
            }
        }
    }
</script>

<style scoped>
    .box{
        border: 1px solid #F5F5F5;
        box-shadow: -10px 10px 30px #DCDCDC;
        margin:20px auto 50px;
        padding: 20px 30px;
        overflow: auto;
    }
    .item{
        padding-bottom: 30px;
    }
    .item span{
        display: inline-block;
    }
    .item span:nth-child(1){
        width: 100px;
        vertical-align: top;
    }
    .item .radio{
        display: inline-block;
    }
    .item .select{
        display: inline-block;
    }
    .item .el-input,.item .el-select{
        width: 300px;
    }
    .item .el-textarea{
        width: 300px;
    }
    .btnTools{
        text-align: center;
        padding: 20px 0;
    }
    .quill-editor{
        display: inline-block;
        height: 400px;
    }
    /*.el-input__inner{
    	width: 140px;
    }*/
</style>