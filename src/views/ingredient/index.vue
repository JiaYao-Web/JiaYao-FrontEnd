<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img src="../../assets/icons/Ingredients.png" alt="商品图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">Ingredient</div>精选食材
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div style="margin-top: -10px;display: flex;justify-content: center;margin-left: 100px">
          <el-button type="success" @click="uploadIngredient">上传食材</el-button>
        </div>
        <!--商品信息-->
        <!--没有食材-->
        <div class="searchBar">
          <el-empty v-if="ingredientList.length === 0" description="精选食材为空"></el-empty>
        </div>
        <!--有食材-->
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
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import { getAllIngredient } from '../../api/ingredientAPI'

export default {
  name: 'IngredientIndex',
  components: {NavBar},
  data () {
    return {
      introduction: '精选食材，让你的厨房有无限选择！',
      ingredientList: [],
      color: ['green', 'red', 'blue', 'gray', 'orange', 'brown']
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    getAllIngredient().then(res => {
      this.ingredientList = res.data
    })
  },
  methods: {
    uploadIngredient () {
      this.$router.push('/uploadIngredient')
    },
    goToIngredient (id) {
      this.$router.push(`/ingredient?id=${id}`)
    },
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
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
