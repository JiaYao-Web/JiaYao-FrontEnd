<template>
  <div id="goTop" v-show="goTopShow">
    <a @click="goTop" class="toTop"><i class="el-icon-caret-top"></i></a>
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data () {
    return {
      scrollTop: '',
      goTopShow: false
    }
  },
  created () {
  },
  methods: {
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.goTopShow = this.scrollTop > 150
    },
    goTop () {
      // eslint-disable-next-line one-var
      let timer = null,
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn () {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50// 回到顶部的速度
          document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.goTopShow = false
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.toTop:hover {
  background: rgba(248, 223, 114, .85)
}

.toTop {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  opacity: .8;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
  right: 15px;
  color: #409eff;
  font-size: 36px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 0 6px rgb(0 0 0);
}
</style>
