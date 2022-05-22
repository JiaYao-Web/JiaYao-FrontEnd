<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <div>
      <div class="title">上传食材</div>
      <div class="post-container">
        <div class="wrap">
          <div class="post-box">
            <div class="box-title">
              <i  class="category">食材信息</i>
            </div>
            <!--顶部进度条-->
            <div class="box-body">
              <div class="progress-bar">
                <el-steps :active=active align-center>
                  <el-step title="步骤1" description="上传食材基本信息"></el-step>
                  <el-step title="步骤2" description="上传食材图片"></el-step>
                  <el-step title="步骤3" description="成功上传"></el-step>
                </el-steps>
              </div>
              <!--填写内容-->
              <div>
                <!--步骤一-->
                <div v-show="active === 0">
                  <div class="info-title">请填写食材的基本信息</div>
                  <el-form :label-position="labelPosition" label-width="300px" style="margin-top: 30px">
                    <el-form-item label="食材名称">
                      <el-input class="book-info-input" v-model="formData.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="食材分类">
                      <el-input class="book-info-input" v-model="formData.category" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="食材简介">
                      <el-input class="book-info-input" v-model="formData.introduction" clearable type="textarea" :rows="3"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button @click="nextStep" style="margin-top: 3px">下一步</el-button>
                </div>
                <!--步骤二-->
                <div v-show="active === 1">
                  <div class="info-title">请上传食材的相关图片</div>
                  <div>
                    <el-upload
                      list-type="picture-card" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change = "handleChange" :before-remove="beforeRemove"
                      multiple :limit="5" :auto-upload= "false" :file-list="fileList" style="margin-top: 50px" accept=".png,.jpg">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且最多上传五个文件</div>
                    </el-upload>
                  </div>
                  <el-button  @click="lastStep" style="margin-top: 50px">上一步</el-button>
                  <el-button  @click="nextStep" style="margin-top: 50px">下一步</el-button>
                </div>
                <!--步骤三-->
                <div v-show="active === 2">
                  <div class="info-title">信息确认</div>
                  <div style="display: flex;justify-content: center">
                    <div class="confirmSubmit">请确认是否是提交？</div>
                  </div>
                  <el-button v-show="active !== 0" @click="lastStep" style="margin-top: 120px">上一步</el-button>
                  <el-button v-show="active === 2" @click="submit" class="button" type="success" style="margin-top: 100px">提交</el-button>
                </div>
              </div>
              <!--提交按钮-->
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'

export default {
  name: 'UploadIngredient',
  components: {NavBar},
  data () {
    return {
      active: 0,
      // 步骤一：商品信息
      labelPosition: 'right',
      formData: {
        category: '',
        name: '',
        content: '',
        introduction: ''
      },
      // 步骤二：上传图片
      imageUrl: '',
      fileList: []
    }
  },
  created () {
  },
  methods: {
    nextStep () {
      this.active++
    },
    lastStep () {
      this.active--
    },
    submit () {
      let formData = new FormData()
      formData.append('formData', new Blob([JSON.stringify(this.formData)], {type: 'application/json'}))
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('files', this.fileList[i].raw)
      }
      console.log(formData.get('formData'))
      console.log(formData.get('files'))
    },
    handleRemove () {
      this.fileList.pop()
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType === 'jpg' || fileType === 'png') {
        this.fileList.push(file)
      } else {
        this.$message.error('请上传正确类型的文件')
      }
      console.log(this.fileList.length)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
.title{
  margin-top: 120px;
  text-align: center;
  font-weight: bolder;
  font-size: 32px;
}
.post-container{
  margin: 2.5rem;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
}
.wrap{
  z-index: 100;
  width:90%
}
.post-box{
  display:block;
  background-color: #fff;
}
.box-title{
  height: 0.2rem;
  background-image: linear-gradient(to right, #0071ae , #5db143);
  margin:0;
}
.category{
  float:left;
  display: inline-block;
  position: relative;
  background-color: #0071ae;
  color: white;
  transition: color 0.2s;
  padding: .4rem 2rem 0.5rem
}

.box-body{
  padding: 1px 0;
  height: 650px;
  background-color: whitesmoke;
}

.progress-bar{
  margin-top: 50px;
}
.info-title{
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
}
.confirmSubmit{
  text-align: center;
  margin-top: 50px;
  font-size: 24px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.book-info-input{
  width: 500px;
  margin-left: -250px;
}
</style>
