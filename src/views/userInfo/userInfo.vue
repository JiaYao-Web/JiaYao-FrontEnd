<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="user.image" alt="用户图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">用户</div>{{user.name}}
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="font-size: 16px;font-weight: bolder">邮箱：{{user.email}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--下方信息展示-->
        <div style="display: flex">
          <!--修改头像-->
          <div style="margin-left: 200px">
            <div style="font-size: 18px;font-weight: bolder">修改头像</div>
            <el-upload
              list-type="picture-card" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change = "handleChange" :before-remove="beforeRemove"
              multiple :limit="1" :auto-upload= "false" :file-list="fileList" style="margin-top: 50px" accept=".png,.jpg">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button type="success" style="margin-top: 50px" @click="confirmChangeImage">确认修改</el-button>
          </div>
          <!--修改用户名-->
          <div style="margin-left: 200px">
            <div style="font-size: 18px;font-weight: bolder">修改用户名</div>
            <el-form :label-position="labelPosition" label-width="80px" :model="nameForm" style="margin-top: 100px">
              <el-form-item label="新昵称">
                <el-input v-model="nameForm.newName" clearable></el-input>
              </el-form-item>
            </el-form>
            <el-button type="success" style="margin-top: 87px" @click="confirmChangeName">确认修改</el-button>
          </div>
          <!--修改密码-->
          <div style="margin-left: 200px">
            <div style="font-size: 18px;font-weight: bolder">修改密码</div>
            <el-form :label-position="labelPosition" label-width="80px" :model="passwordForm" style="margin-top: 60px">
              <el-form-item label="原密码">
                <el-input v-model="passwordForm.oldPassword" showPassword clearable></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="passwordForm.newPassword"  showPassword clearable></el-input>
              </el-form-item>
            </el-form>
            <el-button type="success" style="margin-top: 60px" @click="confirmChangePassword">确认修改</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import {getMyInfo, changePassword, changeName, changeImage} from '../../api/userInfo'

export default {
  name: 'UserInfo',
  components: {NavBar},
  data () {
    return {
      user: {},
      labelPosition: 'right',
      // 修改头像
      fileList: [],
      // 修改昵称
      nameForm: {
        newName: ''
      },
      // 修改密码
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  created () {
    getMyInfo().then(res => {
      this.user = res.data
      this.$forceUpdate()
    })
  },
  methods: {
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
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    confirmChangePassword () {
      const params = {userId: this.user.userId, oldPassword: require('js-sha256').sha256(this.passwordForm.oldPassword), newPassword: require('js-sha256').sha256(this.passwordForm.newPassword)}
      changePassword(params).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          this.passwordForm.newPassword = ''
          this.passwordForm.oldPassword = ''
        }
      })
    },
    confirmChangeName () {
      const params = {name: this.nameForm.newName}
      changeName(params).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          this.user.name = this.nameForm.newName
          this.nameForm.newName = ''
        }
      })
    },
    confirmChangeImage () {
      const formData = new FormData()
      formData.append('FILE', this.fileList[0].raw)
      changeImage(formData).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success('修改成功')
          this.user.image = res.data.msg
          this.fileList = []
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/.el-table, .el-table tr, .el-table td, .el-table th {
  background-color: transparent!important;
}
.table /deep/ .el-table th {
  background-color: transparent!important;
}

.table /deep/ .el-table tr {
  background-color: transparent!important;
}
.table /deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}
.book {
  margin: 0 auto;
  padding: 20px;
  z-index: 1000;
}

.book-top-card {
  display: flex;
  z-index: 1000;
}

.book-img-wrap {
  width: 200px;
  height: 200px;
  z-index: 1000;
}

.book-img-wrap img {
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.book-info {
  padding: 0 20px;
  flex: 1;
  z-index: 1000;
}

.book-info .tag1 {
  color: #2e0f6d;
  border: 1px solid #2e0f6d;
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0 7px;
  cursor: default;
  z-index: 1000;
}

.book-name {
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.book-desc span:nth-of-type(2){
  /*font-size: 14px;*/
  z-index: 1000;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: none;
  z-index: 1000;
}
</style>
