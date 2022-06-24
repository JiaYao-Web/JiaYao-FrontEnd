<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div class="searchInfo">
      {{this.searchInfo}} 搜索结果如下：
    </div>
    <!--搜索结果-->
    <!--没有结果-->
    <div class="searchBar">
      <el-tabs v-model="activeName">
        <el-tab-pane label="菜谱" name="first">
          <el-empty v-if="menuList.length === 0" description="暂时未搜索到相关记录"></el-empty>
          <div v-if="menuList.length > 0" class="searchBar">
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in menuList" :key="index" style="width: 25%">
                  <div style="margin-top: 20px">
                    <el-card class="card">
                      <div class="book-title">{{item.menuName}}</div>
                      <div style="display: flex">
                        <img :src="item.menuImage" @click="goToMenu(item.menuId)" alt="这是一张图片" class="book-img">
                        <div style="margin-left: 30px;margin-top: 60px" @click="goToCategory(item.category)">
                          <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                          <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                          <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                          <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                          <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                        </div>
                      </div>
                      <div style="display: flex;margin-top: 10px;margin-left: 30px">
                        <img  style="width: 50px;height: 50px" :src="item.userImage" @click="goToUser(item.userId)">
                        <div style="margin-left: 10px" @click="goToUser(item.userId)">
                          <div style="font-style:oblique">提供者</div>
                          <div style="margin-top: 10px;font-style:oblique">{{item.userName}}</div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="食材" name="second">
          <el-empty v-if="ingredientList.length === 0" description="暂时未搜索到相关记录"></el-empty>
          <div v-if="ingredientList.length > 0" class="searchBar">
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in ingredientList" :key="index" style="width: 25%">
                  <div style="margin-top: 20px">
                    <el-card class="card">
                      <div class="book-title">{{item.name}}</div>
                      <div style="display: flex">
                        <img :src="item.url" alt="这是一张图片" class="book-img">
                        <div style="display: flex;margin-top: 10px;margin-left: 30px">
                          <div style="margin-top: 55px" @click="goToCategory(item.category)">
                            <div  v-if="item.category === '蔬菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                            <div  v-if="item.category === '肉类'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                            <div  v-if="item.category === '水产'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                            <div  v-if="item.category === '豆乳蛋类'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                            <div  v-if="item.category === '谷类'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                            <div  v-if="item.category === '调味料'" class="arrow-line" v-bind:style="{ background: color[5]}">{{item.category}}</div>
                          </div>
                        </div>
                      </div>
                      <el-button style="margin-top: 20px" @click="goToIngredient(item.id)">查看详情</el-button>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户" name="third">
          <el-empty v-if="userList.length === 0" description="暂时未搜索到相关记录"></el-empty>
          <div v-if="userList.length > 0" class="searchBar">
            <div>
              <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                <div v-for="(item, index) in userList" :key="index" style="width: 25%">
                  <div style="margin-top: 20px">
                    <el-card class="card">
                      <div class="book-title">{{item.name}}</div>
                      <div style="display: flex">
                        <img :src="item.image" alt="这是一张图片" style="margin-left: 100px" class="book-img">
                      </div>
                      <el-button style="margin-top: 20px" @click="goToUser(item.id)">查看详情</el-button>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import {searchIngredient, searchMenu, searchUser} from '../../api/search'

export default {
  name: 'SearchDetail',
  components: {NavBar},
  data () {
    return {
      searchInfo: '',
      menuList: [],
      ingredientList: [],
      userList: [],
      activeName: 'first',
      color: ['green', 'red', 'blue', 'gray', 'orange', 'brown']
    }
  },
  created () {
    // 初始化相关信息
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    let searchInfo = ''
    if (this.$route.query.detail === undefined) searchInfo = 1
    else searchInfo = this.$route.query.detail
    this.searchInfo = searchInfo
    const param = {searchInfo: searchInfo}
    searchMenu(param).then(res => {
      console.log(res)
      this.menuList = res.data
    })
    searchIngredient(param).then(res => {
      console.log(res)
      this.ingredientList = res.data
    })
    searchUser(param).then(res => {
      console.log(res)
      this.userList = res.data
    })
  },
  methods: {
    goToMenu (id) {
      this.$router.push(`/menu?id=${id}`)
    },
    goToUser (id) {
      this.$router.push(`/user?id=${id}`)
    },
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
    },
    goToIngredient (id) {
      this.$router.push(`/ingredient?id=${id}`)
    }
  }
}
</script>

<style scoped>
.searchInfo{
  margin-top: 100px;
  font-weight: bolder;
  text-align: center;
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
  margin-left: 60px;
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
.arrow-line::after {
  content: '';
  position: absolute;
  right: -20px;
  border: 10px solid transparent;
}
</style>
