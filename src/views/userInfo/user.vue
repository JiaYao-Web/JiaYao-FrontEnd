<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="user.image" alt="菜单图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">用户</div>{{user.name}}
              <div class="el-icon-star-on" v-show="favoriteVisible"></div>
              <div class="el-icon-star-off" v-show="!favoriteVisible"></div>
              <div  style="margin-left: 600px;margin-top: 10px">
                <el-button @click="changeActive('first')">菜谱</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{menuList.length}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="changeActive('second')">食材</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{ingredientList.length}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="changeActive('third')">关注</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{followList.length}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="$router.push('/favorite')">收藏</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{favoriteNumber}}</div>
              </div>
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{user.favorite}}人关注</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{user.introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--具体的用户信息-->
        <el-tabs v-model="activeName" class="el-tabs">
          <!--菜谱-->
          <el-tab-pane label="菜谱" name="first">
            <div class="searchBar">
              <el-empty v-if="menuList.length === 0" description="暂时没有上传过菜谱"></el-empty>
            </div>
            <div v-if="menuList.length > 0" class="searchBar">
            </div>
          </el-tab-pane>
          <!--食材-->
          <el-tab-pane label="食材" name="second">
            <div class="searchBar">
              <el-empty v-if="ingredientList.length === 0" description="暂时没有上传过食材"></el-empty>
            </div>
            <div v-if="ingredientList.length > 0" class="searchBar">
            </div>
          </el-tab-pane>
          <!--关注-->
          <el-tab-pane label="关注" name="third">
            <div class="searchBar">
              <el-empty v-if="followList.length === 0" description="暂时没有关注其他用户"></el-empty>
            </div>
            <div v-if="followList.length > 0" class="searchBar">
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
export default {
  name: 'User',
  components: {NavBar},
  data () {
    return {
      user: {introduction: '中华小当家', name: 'Magic_shroom', image: require('@/assets/temp/magic_shroom.png'), favorite: 2},
      favoriteVisible: false,
      menuList: [],
      ingredientList: [],
      followList: [],
      favoriteNumber: 0,
      activeName: 'first'
    }
  },
  created () {
  },
  methods: {
    changeActive (active) {
      this.activeName = active
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
.book-user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
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
</style>
