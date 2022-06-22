<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <!--轮播图-->
    <div>
      <el-carousel :interval="4000" :height="carouselHeight" type="card" class="carousel">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.picImg" alt="轮播图"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--每日菜单精选-->
    <div style="margin-top: 20px">
      <div class="recommend-title">
        <div class="choice-title">每日菜单精选</div>
        <router-link class="recommend-link" to="/menuIndex">更多 ></router-link>
      </div>
      <div class="card-box">
        <div v-for="(item , index) in recommendMenuList" :key="index" style="width: 25%">
          <div style="margin-top: 20px">
            <el-card class="recommend-card" >
              <img @click="goToMenu(item.menuId)" :src="item.menuImage" style="width: 100%;height: 160px;border: solid;color: orange;border-radius: 20px" alt=""/>
              <div class="recommend-card-img">{{item.menuName}}</div>
              <div @click="goToUser(item.userId)" class="recommend-card-author">By {{item.userName}}</div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex">
      <div style="margin-top: 20px;width: 71%">
        <div>
          <div class="recommend-title">
            <div class="choice-title">热门分类</div>
            <router-link class="search-link" to="/category">更多 ></router-link>
          </div>
          <div class="search-content">
            <div class="search-card">
              <div v-for="(item , index) in categoryList" :key="index" style="width: 25%">
                <div style="margin-top: 20px">
                  <el-card class="search-card-item">
                    <router-link to="/" class="search-to-link">{{item.name}}</router-link>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--热门食材-->
        <div style="margin-top: 30px">
          <div class="recommend-title">
            <div class="ingredient-title">热门食材</div>
            <router-link class="ingredient-link" to="/ingredientIndex">更多 ></router-link>
          </div>
          <div class="ingredient-content">
            <div class="ingredient-card">
              <div v-for="(item , index) in ingredientList" :key="index" style="width: 20%">
                <div style="margin-top: 20px">
                  <div class="ingredient-card-item" @click="goToIngredient(item.id)">
                    <img :src="item.url" class="ingredient-img" alt=""/>
                    <router-link to="/" class="ingredient-name">{{item.name}}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--美食达人-->
      <div style="margin-left: 32px;width: 21%">
        <div class="expert-box">
          <div class="expert-title">美食达人</div>
          <router-link class="expert-link" to="/allUser">更多 ></router-link>
        </div>
        <div class="expert-content">
          <div>
            <el-card v-for="(item, index) in userList" :key="index" style="height: 60px;margin-top: 15px">
              <div style="display: flex">
                <img :src="item.image" class="expert-img" alt="用户" @click="goToUser(item.id)"/>
                <div style="margin-left: 15px;min-width: 100px">
                  <div class="expert-name">{{item.name}}</div>
                  <div class="expert-fans">{{item.fanNumber}}粉丝</div>
                </div>
                <el-button v-show="!item.isMyself && !item.ifFollow" class="expert-button" @click="follow(item.id)">关注 +</el-button>
                <el-button v-show="!item.isMyself && item.ifFollow" class="expert-button" @click="unfollow(item.id)">已关注 √</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!--底部留白-->
    <div style="height: 200px"></div>
    <!--回到顶部-->
    <BackToTop/>
  </div>
</template>

<script>
import { swiperList } from '../../assets/Data/swiper'
import NavBar from '../../components/NavBar'
import BackToTop from '../../components/BackToTop'
import { getAllIngredient } from '../../api/ingredientAPI'
import { getAllMenu } from '../../api/menuAPI'
import {getAllUserHome, followUser} from '../../api/followApi'

export default {
  name: 'home',
  components: {NavBar, BackToTop},
  props: {
    carouselHeight: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      // 轮播图
      swiperList: swiperList,
      // 推荐菜单列表
      recommendMenuList: [],
      // eslint-disable-next-line standard/object-curly-even-spacing
      // 美食达人列表
      userList: [],
      // 经常搜索列表
      categoryList: [{name: '小吃'}, {name: '主食'}, {name: '烘焙'}, {name: '饮品'}, {name: '凉菜'}, {name: '早餐'}, {name: '煎炸'}, {name: '粤菜'}],
      // 食材列表
      ingredientList: []
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    // 获取菜谱
    getAllMenu().then(res => {
      if (res.data.length <= 8) this.recommendMenuList = res.data
      else {
        this.menuLoading = false
        this.recommendMenuList = this.getRandomArrayElements(res.data, 8)
      }
    })
    // 获取食材
    getAllIngredient().then(res => {
      if (res.data.length <= 10) this.ingredientList = res.data
      else {
        this.ingredientList = this.getRandomArrayElements(res.data, 10)
      }
    })
    // 获取用户
    getAllUserHome().then(res => {
      console.log(res)
      if (res.data.length <= 6) this.userList = res.data
      else {
        this.userList = this.getRandomArrayElements(res.data, 6)
      }
    })
    // 获取分类
  },
  methods: {
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0)
      let i = arr.length
      let min = i - count
      let temp = ''
      let index = '' // 只是声明变量的方式, 也可以分开写
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random()) // 这里的+1 是因为上面i--的操作  所以要加回来
        temp = shuffled[index] // 即值交换
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    goToIngredient (id) {
      this.$router.push(`/ingredient?id=${id}`)
    },
    goToMenu (id) {
      this.$router.push(`/menu?id=${id}`)
    },
    goToUser (id) {
      this.$router.push(`/user?id=${id}`)
    },
    follow (id) {
      const param = {id: id.toString(), confirm: true}
      followUser(param).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          location.reload()
        }
      })
    },
    unfollow (id) {
      const param = {id: id.toString(), confirm: false}
      followUser(param).then(res => {
        if (!res.data.status) this.$message.error(res.data.msg)
        else {
          this.$message.success(res.data.msg)
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
/*轮播图*/
.carousel{
  width: 100.8%;
  margin-left: -8px;
  margin-right: -9px;
  top: 16px;
  z-index: 1000;
}
/*菜单*/
.choice-title{
  font-weight: bolder;
  font-size: 24px;
  margin-left: 80px;
}
.card-box{
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 60px;
}
.recommend-link{
  margin-right: 100px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.recommend-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.recommend-card{
  height: 250px;
  margin-left: 20px
}
.recommend-card-img{
  margin-top: 7px;
  font-family: 'Arial Narrow',serif;
}
.recommend-card-author{
  margin-top: 10px;
  font-family: 'Brush Script MT',serif
}
/*美食达人*/
.expert-title{
  font-weight: bolder;
  font-size: 24px;
}
.expert-link{
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.expert-content{
  margin-top: 10px;
  height: 450px;
}
.expert-box{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.expert-button{
  margin-left: 20px;
  margin-top: -10px;
  height: 40px;
  width: 100px;
}
.expert-img{
  margin-top: -15px;
  width: 50px;
  height: 50px;
  display: block;
  margin-left: -10px;
}
.expert-name{
  margin-top: -10px;
  font-family: Arial,serif;
}
.expert-fans{
  margin-top: 5px;
  font-size: 12px;
}
/*大家都在搜*/
.search-content{
  height: 200px;
  margin-left: 70px;
  margin-top: 10px;
}
.search-card{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 60px;
}
.search-link{
  margin-right: 30px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.search-to-link{
  text-decoration: none;
  color: black;
  font-family: "Copperplate Gothic Light",serif;
}
.search-to-link:hover{
  color: rgb(242, 206, 43)
}
.search-card-item{
  border: solid;
  border-radius: 30px;
  width: 150px
}
.search-card-item:hover{
  color: rgb(242, 206, 43)
}
/*食材推荐*/
.ingredient-title{
  font-weight: bolder;
  font-size: 24px;
  margin-left: 80px;
}
.ingredient-link{
  margin-right: 20px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.ingredient-content{
  height: 370px;
  background-color: rgb(241, 247, 250);
  margin-left: 70px;
  margin-top: 10px
}
.ingredient-card{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 25px;
}
.ingredient-card-item{
  width: 150px;
  height: 150px;
}
.ingredient-img{
  height: 140px;
  width: 140px;
  border: solid;
}
.ingredient-name{
  text-decoration: none;
  color: black;
  font-family: "ERS v2 Natural Events",serif;
}
</style>
