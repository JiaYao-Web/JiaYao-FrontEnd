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
              <div class="el-icon-star-on" @click="unfollow(user.userId)" v-if="!user.isMyself && user.ifFollow"></div>
              <div class="el-icon-star-off" @click="follow(user.userId)"  v-if="!user.isMyself && !user.ifFollow"></div>
              <div  style="margin-left: 600px;margin-top: 10px">
                <el-button @click="changeActive('first')">菜谱</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{menuList.length}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="changeActive('second')">点赞</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{likeNumber}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="changeActive('third')">关注</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{followList.length}}</div>
              </div>
              <div style="margin-top: 10px">
                <el-button @click="handleFavorite">收藏</el-button>
                <div style="font-size: 14px;margin-top: 5px">{{favoriteNumber}}</div>
              </div>
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{user.followNumber}}人关注</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">邮箱</div>
                <div>{{user.email}}</div>
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
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in menuList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px">
                      <el-card class="card">
                        <div class="book-title">{{item.name}}</div>
                        <div style="display: flex">
                          <img :src="item.image" @click="goToMenu(item.id)" alt="这是一张图片" class="book-img">
                          <div style="margin-left: 30px;margin-top: 60px" @click="goToCategory(item.category)">
                            <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                            <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                            <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                            <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                            <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--点赞-->
          <el-tab-pane label="点赞" name="second">
            <div style="margin-top: -5px">
              <el-tabs v-model="activeLike" class="el-tabs">
                <el-tab-pane label="菜谱" name="likeOne">
                  <div class="searchBar">
                    <el-empty v-if="menuLikeList.length === 0" description="暂时没有点赞过菜谱"></el-empty>
                  </div>
                  <div v-if="menuLikeList.length > 0" class="searchBar">
                    <div>
                      <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                        <div v-for="(item, index) in menuLikeList" :key="index" style="width: 25%">
                          <div style="margin-top: 20px">
                            <el-card class="card">
                              <div class="book-title">{{item.name}}</div>
                              <div style="display: flex">
                                <img :src="item.image" @click="goToMenu(item.id)" alt="这是一张图片" class="book-img">
                                <div style="margin-left: 30px;margin-top: 60px" @click="goToCategory(item.category)">
                                  <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                                  <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                                  <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                                  <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                                  <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                                </div>
                              </div>
                            </el-card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="食材" name="likeTwo">
                  <div class="searchBar">
                    <el-empty v-if="ingredientLikeList.length === 0" description="暂时没有点赞过食材"></el-empty>
                  </div>
                  <div v-if="ingredientLikeList.length > 0" class="searchBar">
                    <div>
                      <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                        <div v-for="(item, index) in ingredientLikeList" :key="index" style="width: 25%">
                          <div style="margin-top: 20px">
                            <el-card class="like-card">
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
              </el-tabs>
            </div>
          </el-tab-pane>
          <!--关注-->
          <el-tab-pane label="关注" name="third">
            <div class="searchBar">
              <el-empty v-if="followList.length === 0" description="暂时没有关注其他用户"></el-empty>
            </div>
            <div v-if="followList.length > 0" class="searchBar">
              <div>
                <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                  <div v-for="(item, index) in followList" :key="index" style="width: 25%">
                    <div style="margin-top: 20px">
                      <el-card class="card">
                        <div style="display: flex">
                          <div>
                            <div style="margin-left: 30px" class="book-title">{{item.name}}</div>
                            <div style="display: flex">
                              <img :src="item.image" alt="这是一张图片" class="book-img">
                            </div>
                          </div>
                          <el-button style="margin-top: 80px;margin-left: 10px;height: 40px" @click="goToUser(item.id)" type="primary">查看详情</el-button>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--收藏-->
          <el-tab-pane label="收藏" name="forth" v-if="!ifMyself">
            <div style="margin-top: -5px">
              <el-tabs v-model="activeFavorite" class="el-tabs">
                <el-tab-pane label="菜谱" name="favoriteOne">
                  <div class="searchBar">
                    <el-empty v-if="menuFavoriteList.length === 0" description="暂时没有收藏过菜谱"></el-empty>
                  </div>
                  <div v-if="menuFavoriteList.length > 0" class="searchBar">
                    <div>
                      <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                        <div v-for="(item, index) in menuFavoriteList" :key="index" style="width: 25%">
                          <div style="margin-top: 20px">
                            <el-card class="card">
                              <div class="book-title">{{item.name}}</div>
                              <div style="display: flex">
                                <img :src="item.image" @click="goToMenu(item.id)" alt="这是一张图片" class="book-img">
                                <div style="margin-left: 30px;margin-top: 60px" @click="goToCategory(item.category)">
                                  <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                                  <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                                  <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                                  <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                                  <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                                </div>
                              </div>
                            </el-card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="食材" name="favoriteTwo">
                  <div class="searchBar">
                    <el-empty v-if="ingredientFavoriteList.length === 0" description="暂时没有收藏过食材"></el-empty>
                  </div>
                  <div v-if="ingredientFavoriteList.length > 0" class="searchBar">
                    <div>
                      <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
                        <div v-for="(item, index) in ingredientFavoriteList" :key="index" style="width: 25%">
                          <div style="margin-top: 20px">
                            <el-card class="like-card">
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
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import {
  getUserMenu,
  getUserDetail,
  getUserFavorite,
  getUserFollow,
  getLikeIngredient,
  getLikeMenu,
  followUser,
  getFavoriteMenu,
  getFavoriteIngredient
} from '../../api/followApi'
import {getMyInfo} from '../../api/userInfo'

export default {
  name: 'User',
  components: {NavBar},
  data () {
    return {
      user: {},
      menuList: [],
      menuLikeList: [],
      ingredientLikeList: [],
      followList: [],
      menuFavoriteList: [],
      ingredientFavoriteList: [],
      likeNumber: 0,
      favoriteNumber: 0,
      activeName: 'first',
      activeLike: 'likeOne',
      activeFavorite: 'favoriteOne',
      id: 0,
      color: ['green', 'red', 'blue', 'gray', 'orange', 'brown'],
      ifMyself: false
    }
  },
  created () {
    // 初始化相关信息
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 1
    else id = this.$route.query.id
    this.id = id
    const param = {userId: parseInt(id)}
    // 获取当前用户
    getMyInfo().then(res => {
      this.ifMyself = res.data.userId === param.userId
      // 获取收藏
      if (this.ifMyself) {
        getUserFavorite(param).then(res => {
          this.favoriteNumber = res.data
        })
      } else {
        getFavoriteMenu(param).then(res => {
          this.menuFavoriteList = res.data
          getFavoriteIngredient(param).then(re => {
            this.ingredientFavoriteList = re.data
            this.favoriteNumber = res.data.length + re.data.length
          })
        })
      }
    })
    // 获取个人信息
    getUserDetail(param).then(res => {
      this.user = res.data
    })
    // 获取菜单信息
    getUserMenu(param).then(res => {
      this.menuList = res.data
    })
    // 获取点赞信息
    getLikeIngredient(param).then(res => {
      this.ingredientLikeList = res.data
      getLikeMenu(param).then(re => {
        this.menuLikeList = re.data
        this.likeNumber = res.data.length + re.data.length
      })
    })
    // 获取关注信息
    getUserFollow(param).then(res => {
      this.followList = res.data
    })
  },
  methods: {
    changeActive (active) {
      this.activeName = active
    },
    goToIngredient (id) {
      this.$router.push(`/ingredient?id=${id}`)
    },
    goToMenu (id) {
      this.$router.push(`/menu?id=${id}`)
    },
    goToUser (id) {
      this.$router.push(`/user?id=${id}`)
      location.reload()
    },
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
    },
    handleFavorite () {
      if (this.ifMyself) this.$router.push('/favorite')
      else this.activeName = 'forth'
    },
    follow (id) {
      const param = {id: id.toString(), confirm: true}
      followUser(param).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          this.user.ifFollow = true
          this.user.followNumber++
        }
      })
    },
    unfollow (id) {
      const param = {id: id.toString(), confirm: false}
      followUser(param).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          this.user.ifFollow = false
          this.user.followNumber--
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
.card{
  width: 330px;
  height: 230px;
  margin-left: 20px
}
.like-card{
  width: 330px;
  height: 270px;
  margin-left: 20px
}
.book-title{
  font-weight: bolder;
}
.book-img{
  display: flex;
  flex-direction: column;
  margin-left: 35px;
  margin-top: 10px;
  width: 150px;
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
