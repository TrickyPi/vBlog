<template>
  <div class="btn" @click="$router.push({ path: '/Algorithm/BubbleSort' })">
    GO →
  </div>
</template>
<script>
export default {
  name: "Btn"
};
</script>
<style lang="stylus">
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top:-3rem;
  margin-left:-3rem;
  width 6rem
  height 6rem
  background-color rgba(255,255,255,0.8)
  border-radius 50%
  text-align center
  line-height 6rem
  font-size 1.2rem
  color #666
  cursor pointer
  animation up 1s ease-in infinite alternate
}
@keyframes up {
  0%{
    transform translate3d(-5px,0,0)
  }
  100%{
    transform translate3d(5px,0,0)
  }
}
</style>
