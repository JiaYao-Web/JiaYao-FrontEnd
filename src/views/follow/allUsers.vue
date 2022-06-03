<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img src="../../assets/icons/user.png" alt="商品图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">Users</div>美食达人
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--商品信息-->
        <!--没有用户-->
        <div class="searchBar">
          <el-empty v-if="userList.length === 0" description="暂时没有用户"></el-empty>
        </div>
        <!--有用户-->
        <div v-if="userList.length > 0" class="searchBar">
          <div>
            <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in userList" :key="index" style="width: 25%">
                <div style="margin-top: 20px">
                  <el-card class="card">
                    <div class="book-title">{{item.name}}</div>
                    <div style="display: flex">
                      <img :src="item.image" alt="这是一张图片" class="book-img">
                    </div>
                    <el-button style="margin-top: 20px" @click="goToUser(item.id)">查看详情</el-button>
                  </el-card>
                </div>
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
import {getAllUser} from '../../api/followApi'

export default {
  name: 'AllUsers',
  components: {NavBar},
  data () {
    return {
      introduction: '各路美食达人，让厨房成为梦的天堂',
      userList: [],
      color: ['green', 'red', 'blue', 'gray', 'orange', 'brown']
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    getAllUser().then(res => {
      console.log(res)
      this.userList = res.data
    })
  },
  methods: {
    goToUser (id) {
      this.$router.push(`/user?id=${id}`)
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
  /*max-width: 1300px;*/
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
.searchBar{
  margin-top: 20px;
}
.card{
  width: 350px;
  height: 270px;
  margin-left: 20px
}
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  margin-top: 10px;
  width: 130px;
  height: 150px;
}
.arrow-line {
  position: relative;
  width: 70px;
  height: 20px;
  color: #F9F0DA;
}
</style>
