<template>
  <div>
    <!--顶部导航-->
    <NavBar/>
    <div style="margin-top: 80px">
      <div class="book">
        <!--商品图标-->
        <div class="book-top-card">
          <div class="book-img-wrap">
            <img :src="menu.image" alt="菜单图片">
          </div>
          <div class="book-info">
            <div class="book-name">
              <div class="tag1">Category</div>分类
            </div>
            <div>
              <el-card style="margin-top: 10px;max-height: 140px;background: transparent;text-justify: inter-ideograph;overflow: auto;">
                <div style="color: #6A5ACD">简介</div>
                <div>{{menu.introduction}}</div>
              </el-card>
            </div>
          </div>
        </div>
        <!--商品信息-->
        <!--没有收藏-->
        <div class="searchBar">
          <el-empty v-if="categoryList.length === 0" description="暂时没有分类信息"></el-empty>
        </div>
        <!--有收藏-->
        <div v-if="categoryList.length > 0" class="searchBar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
export default {
  name: 'Category',
  components: {NavBar},
  data () {
    return {
      menu: {introduction: '食品分类，在这里你可以看到最全的分类，快来选择你最喜欢的菜单/食材吧', name: '西红柿炒鸡蛋', category: '家常菜', image: require('@/assets/temp/vegatables.jpg'), favorite: 2, like: 2},
      categoryList: []
    }
  },
  created () {
  },
  methods: {
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
