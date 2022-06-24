<template>
  <div>
    <!--导航栏-->
    <NavBar/>
    <!--背景-->
    <div class="Img_Box">
      <img src="../../assets/search/background.jpg" width="100%" height="100%"  alt="background"/>
    </div>
    <!-- 搜索框 -->
    <div class="search bar">
      <form style="z-index: 1000;">
        <input v-model="input" type="text" placeholder="请输入您要搜索的内容...">
        <button type="submit" class="fa" @click="search(input)"></button>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar'
export default {
  name: 'Search',
  components: {NavBar},
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search (input) {
      if (this.input === '') location.reload()
      else this.$router.push(`/searchDetail?detail=${input}`)
    }
  }
}
</script>

<style scoped>
.Img_Box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #494A5F;
  font-weight: 500;
  font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;
}

div.search {
  padding: 30px 0;
}

form {
  position: relative;
  width: 300px;
  margin: 0 720px;
}

input, button {
  border: none;
  outline: none;
}

input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}

button {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}
.bar {
  margin-top:250px;
}
.bar form {
  height: 42px;
}
.bar input {
  width: 400px;
  border-radius: 42px;
  border: 2px solid #324B4E;
  background: #F9F0DA;
  transition: .3s linear;
  float: right;
}
.bar input:focus {
  width: 500px;
}
.bar button {
  background: none;
  top: -2px;
  right: 0;
}
.bar button:before{
  content: "\f002";
  color: #324b4e;
}
</style>
