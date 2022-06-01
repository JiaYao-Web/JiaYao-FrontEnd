<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book" v-loading="loading" element-loading-text="加载食材中...">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="ingredient.image" alt="菜单图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">{{ingredient.category}}</div>{{ingredient.name}}
              <div class="el-icon-star-on" v-show="favoriteVisible" @click="confirmFavorite(false)"></div>
              <div class="el-icon-star-off" v-show="!favoriteVisible" @click="confirmFavorite(true)"></div>
              <img src="../../assets/icons/like_fill.png" style="width: 32px;height: 32px" v-show="likeVisible" @click="confirmLike(false)" alt="点赞图片"/>
              <img src="../../assets/icons/like.png" style="width: 32px;height: 32px" v-show="!likeVisible" @click="confirmLike(true)" alt="点赞图片"/>
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{ingredient.favoriteNumber}}人收藏</span>
                <span style="margin-left: 20px">共{{ingredient.likeNumber}}人点赞</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{ingredient.introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--商品信息-->
        <!--没有收藏-->
        <div class="searchBar">
          <el-empty v-if="menuList.length === 0" description="该食材不在任何菜谱中出现过"></el-empty>
        </div>
        <!--有收藏-->
        <div v-if="menuList.length > 0" class="searchBar">
          <div>
            <div style="width: 100%;display: flex;flex-direction: row;flex-wrap: wrap">
              <div v-for="(item, index) in menuList" :key="index" style="width: 25%">
                <div style="margin-top: 20px">
                  <el-card class="card">
                    <div class="book-title">{{item.name}}</div>
                    <div style="display: flex">
                      <img :src="item.image" alt="这是一张图片" class="book-img">
                      <div style="display: flex;margin-top: 10px;margin-left: 30px">
                        <div style="margin-top: 55px" @click="goToCategory(item.category)">
                          <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: color[0]}">{{item.category}}</div>
                          <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: color[1]}">{{item.category}}</div>
                          <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: color[2]}">{{item.category}}</div>
                          <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: color[3]}">{{item.category}}</div>
                          <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: color[4]}">{{item.category}}</div>
                        </div>
                      </div>
                    </div>
                    <el-button style="margin-top: 20px;" @click="goToMenu(item.id)">查看详情</el-button>
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
import {getIngredientDetail, favoriteIngredient, likeIngredient} from '../../api/ingredientAPI'

export default {
  name: 'Ingredient',
  components: {NavBar},
  data () {
    return {
      ingredient: {introduction: '暂无', name: '暂无', category: '暂无', image: '暂无', favorite: 0, like: 0},
      menuList: [],
      favoriteVisible: false,
      likeVisible: false,
      id: 1,
      color: ['red', 'blue', 'gray', 'orange', 'green'],
      loading: true
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 1
    else id = this.$route.query.id
    this.id = id
    const param = {ingredientId: id}
    getIngredientDetail(param).then(res => {
      this.ingredient = res.data
      this.menuList = res.data.menus
      this.loading = false
      this.favoriteVisible = res.data.ifFavorite
      this.likeVisible = res.data.ifLike
    })
  },
  methods: {
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
    },
    goToMenu (id) {
      this.$router.push(`/menu?id=${id}`)
    },
    confirmFavorite (value) {
      if (value) {
        const param = {id: this.id, confirm: true}
        favoriteIngredient(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.favoriteVisible = true
            this.ingredient.favoriteNumber++
            this.$message.success(res.data.msg)
          }
        })
      } else {
        const param = {id: this.id, confirm: false}
        favoriteIngredient(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.favoriteVisible = false
            this.ingredient.favoriteNumber--
            this.$message.success(res.data.msg)
          }
        })
      }
    },
    confirmLike (value) {
      if (value) {
        const param = {id: this.id, confirm: true}
        likeIngredient(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.likeVisible = true
            this.ingredient.likeNumber++
            this.$message.success(res.data.msg)
          }
        })
      } else {
        const param = {id: this.id, confirm: false}
        likeIngredient(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.likeVisible = false
            this.ingredient.likeNumber--
            this.$message.success(res.data.msg)
          }
        })
      }
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
