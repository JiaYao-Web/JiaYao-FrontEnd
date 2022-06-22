<template>
  <div>
    <div class="nav">
      <ul class="nav-content">
        <li style="display: flex;flex-shrink: 0">
          <img src="@/assets/NavBar/icon.png" alt="" style="height: 70px;width: 70px"/>
          <div class="words">“佳肴”美食分享平台</div>
        </li>
        <li class="nav-li" v-for="(item , index) in items" v-bind:key="index">
          <img :src="item.img" :alt="item.alt" class="icon" @click="goTo(item.id)">
          <a :href="item.href" class="item-title" style="flex-shrink: 0">{{item.name}}</a>
        </li>
        <li>
          <el-button class="button" type="info" style="padding-left: 9px" @click="search">搜索</el-button>
        </li>
        <li class="nav-li" @click="goToUser">
          <el-avatar class="head" :src="user.image" size="large"></el-avatar>
        </li>
        <li class="nav-dropdown">
          <el-dropdown class="drop" trigger="click" style="color: white">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goToUserInfo">账号信息</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import {getMyInfo} from '../api/userInfo'

export default {
  name: 'NavBar',
  data () {
    return {
      keywords: '',
      items: [
        {
          id: 0,
          name: '首页',
          img: require('@/assets/NavBar/index.png'),
          href: '#/',
          alt: '首页'
        },
        {
          id: 1,
          name: '收藏夹',
          img: require('@/assets/NavBar/favorite.png'),
          href: '#/favorite',
          alt: '收藏夹'
        },
        {
          id: 2,
          name: '菜谱推荐',
          img: require('@/assets/NavBar/menu.png'),
          href: '#/menuIndex',
          alt: '菜谱'
        },
        {
          id: 3,
          name: '精选食材',
          img: require('@/assets/NavBar/food.png'),
          href: '#/ingredientIndex',
          alt: '食材'
        }
      ],
      user: {}
    }
  },
  created () {
    getMyInfo().then(res => {
      this.user = res.data
    })
  },
  methods: {
    search () {
      if (this.keywords === '') this.$router.push('/search')
    },
    goTo (id) {
      if (id === 0) this.$router.push('/')
      else if (id === 1) this.$router.push('/favorite')
      else if (id === 2) this.$router.push('/menuIndex')
      else if (id === 3) this.$router.push('/ingredientIndex')
    },
    goToUser () {
      this.$router.push(`/user?id=${this.user.userId}`)
      if (this.$route.path === '/user') location.reload()
    },
    goToUserInfo () {
      this.$router.push('/userInfo')
    },
    logOut () {
      sessionStorage.removeItem('MyAuthentication')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.nav{
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  height: 75px;
  min-width: 100%;
  width: 100.2%;
  background-image: linear-gradient(to right, rgb(252,161,6), rgb(251,164,20));

  margin-left: -3px;
  margin-right: -17px;
  z-index: 1000;
}
.nav-content{
  margin: 0 auto;
  height: 50px;
  display: flex;
}
.nav-content li{
  float: left;
  display: block;
}
.words{
  text-shadow: 0 0 5px rgb(252,161,6),0 0 10px #68a5d4,0 0 15px #8ef1ef,0 0 20px #ffffff;
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-top: 15px;
  padding-right: 80px;
}
.icon{
  height: 40px;
  width: 40px;
}
.nav-li{
  margin-top: 13px;
  margin-left: 50px;
  height: 70px;
}
.nav-dropdown{
  margin-left: -10px
}
.head{
  margin-top: 5px;
}
.drop{
  margin-top: 32px;
  margin-left: 5px
}
.input{
  height: 50px;
  width: 218px;
  margin-top: 17px;
}
.button{
  width: 100px;
  margin-top: 17px;
  margin-left: 70px;
}
.item-title{
  font-size: 18px;
  margin-top: 20px;
  font-weight: bolder;
  text-decoration: none;
  color: black;
}
</style>
