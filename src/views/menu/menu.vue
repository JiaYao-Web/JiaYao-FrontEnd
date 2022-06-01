<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book" v-loading="loading" element-loading-text="加载菜谱中...">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="menu.image" alt="菜单图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1" @click="goToCategory(menu.category)">{{menu.category}}</div>{{menu.name}}
              <div class="el-icon-star-on" v-show="favoriteVisible" @click="confirmFavorite(false)"></div>
              <div class="el-icon-star-off" v-show="!favoriteVisible" @click="confirmFavorite(true)"></div>
              <img src="../../assets/icons/like_fill.png" style="width: 32px;height: 32px" v-show="likeVisible" @click="confirmLike(false)" alt="点赞图片"/>
              <img src="../../assets/icons/like.png" style="width: 32px;height: 32px" v-show="!likeVisible" @click="confirmLike(true)" alt="点赞图片"/>
            </div>
            <div class="book-user-info">
              <div class="book-create-time">
                <span>共{{menu.favoriteNumber}}人收藏</span>
                <span style="margin-left: 20px">共{{menu.likeNumber}}人点赞</span>
              </div>
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">所需食材</div>
                <div>{{menu.content}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <div class="searchBar">
          <div style="margin-left: 300px">
            <el-table :data="introductionList" stripe style="width: 80%" :header-cell-style="{'text-align':'center'}" :cell-style="{'margin-left':'200px'}">
              <el-table-column prop="step" label="制作步骤"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
import { getMenuDetail, favoriteMenu, likeMenu } from '../../api/menuAPI'

export default {
  name: 'Menu',
  components: {NavBar},
  data () {
    return {
      menu: {},
      favoriteVisible: false,
      likeVisible: false,
      loading: true,
      introductionList: [],
      id: 3
    }
  },
  created () {
    if (window.sessionStorage.getItem('MyAuthentication') === null) this.$router.push('/')
    let id = 0
    if (this.$route.query.id === undefined) id = 1
    else id = this.$route.query.id
    this.id = id
    const param = {menuId: id}
    getMenuDetail(param).then(res => {
      this.loading = false
      this.menu = res.data
      this.favoriteVisible = res.data.ifFavorite
      this.likeVisible = res.data.ifLike
      const list = res.data.introduction.split('\r\n')
      for (let i = 0; i < list.length; i++) {
        this.introductionList.push({step: list[i]})
      }
    })
  },
  methods: {
    goToCategory (category) {
      this.$router.push(`/category?category=${category}`)
    },
    confirmFavorite (value) {
      if (value) {
        const param = {id: this.id, confirm: true}
        favoriteMenu(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.favoriteVisible = true
            this.menu.favoriteNumber++
            this.$message.success(res.data.msg)
          }
        })
      } else {
        const param = {id: this.id, confirm: false}
        favoriteMenu(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.favoriteVisible = false
            this.menu.favoriteNumber--
            this.$message.success(res.data.msg)
          }
        })
      }
    },
    confirmLike (value) {
      if (value) {
        const param = {id: this.id, confirm: true}
        likeMenu(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.likeVisible = true
            this.menu.likeNumber++
            this.$message.success(res.data.msg)
          }
        })
      } else {
        const param = {id: this.id, confirm: false}
        likeMenu(param).then(res => {
          if (!res.data.status) this.$message.error(res.data.msg)
          else {
            this.likeVisible = false
            this.menu.likeNumber--
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
</style>
