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
      <el-empty v-if="resultList.length === 0" description="暂时未搜索到相关记录"></el-empty>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
export default {
  name: 'SearchDetail',
  components: {NavBar},
  data () {
    return {
      searchInfo: '',
      resultList: []
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scoped>
.searchInfo{
  margin-top: 100px;
  font-weight: bolder;
  text-align: center;
}
</style>
