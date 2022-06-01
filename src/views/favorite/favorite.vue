<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img src="../../assets/icons/favorite.png" alt="商品图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">Favorite</div>收藏夹
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <el-tabs v-model="activeName">
          <!--菜谱-->
          <el-tab-pane label="菜谱" name="first">
            <!--没有收藏-->
            <div class="searchBar">
              <el-empty v-if="menuList.length === 0" description="收藏夹为空"></el-empty>
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
                          <img :src="item.image"  alt="这是一张图片" class="book-img">
                          <div style="margin-left: 30px;margin-top: 60px" @click="goToCategory(item.category)">
                            <div  v-if="item.category === '热菜'" class="arrow-line" v-bind:style="{ background: menuColor[0]}">{{item.category}}</div>
                            <div  v-if="item.category === '凉菜'" class="arrow-line" v-bind:style="{ background: menuColor[1]}">{{item.category}}</div>
                            <div  v-if="item.category === '主食'" class="arrow-line" v-bind:style="{ background: menuColor[2]}">{{item.category}}</div>
                            <div  v-if="item.category === '汤'" class="arrow-line" v-bind:style="{ background: menuColor[3]}">{{item.category}}</div>
                            <div  v-if="item.category === '其他'" class="arrow-line" v-bind:style="{ background: menuColor[4]}">{{item.category}}</div>
                          </div>
                        </div>
                        <el-button style="margin-top: 20px" @click="goToMenu(item.id)">查看详情</el-button>
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--食材-->
          <el-tab-pane label="食材" name="second">
            <!--没有收藏-->
            <div class="searchBar">
              <el-empty v-if="ingredientList.length === 0" description="收藏夹为空"></el-empty>
            </div>
            <!--有收藏-->
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
                              <div  v-if="item.category === '蔬菜'" class="arrow-line" v-bind:style="{ background: ingredientColor[0]}">{{item.category}}</div>
                              <div  v-if="item.category === '肉类'" class="arrow-line" v-bind:style="{ background: ingredientColor[1]}">{{item.category}}</div>
                              <div  v-if="item.category === '水产'" class="arrow-line" v-bind:style="{ background: ingredientColor[2]}">{{item.category}}</div>
                              <div  v-if="item.category === '豆乳蛋类'" class="arrow-line" v-bind:style="{ background: ingredientColor[3]}">{{item.category}}</div>
                              <div  v-if="item.category === '谷类'" class="arrow-line" v-bind:style="{ background: ingredientColor[4]}">{{item.category}}</div>
                              <div  v-if="item.category === '调味料'" class="arrow-line" v-bind:style="{ background: ingredientColor[5]}">{{item.category}}</div>
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
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import { getFavoriteIngredient, getFavoriteMenu } from '../../api/favoriteAPI'

export default {
  name: 'Favorite',
  components: {NavBar},
  data () {
    return {
      introduction: '用户收藏夹，每一位用户都可以在此处查看收藏的菜谱、食材。',
      menuList: [],
      ingredientList: [],
      activeName: 'first',
      ingredientColor: ['green', 'red', 'blue', 'gray', 'orange', 'brown'],
      menuColor: ['green', 'red', 'blue', 'gray', 'orange', 'brown']
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    // 获取食材
    getFavoriteIngredient().then(res => {
      this.ingredientList = res.data
    })
    // 获取菜谱
    getFavoriteMenu().then(res => {
      this.menuList = res.data
    })
  },
  methods: {
    goToIngredient (id) {
      this.$router.push(`/ingredient?id=${id}`)
    },
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
    },
    goToMenu (id) {
      this.$router.push(`/menu?id=${id}`)
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
