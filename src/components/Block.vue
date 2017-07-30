<template>
  <section class="Block">
    <slot></slot>
  </section>
</template>

<script>
export default {
};
</script>

<style scoped lang="stylus">
.Block {
  text-align: left;
  padding: 2rem;
  background: #fff;
  box-shadow: rgba(0,0,0,0.05) 0 0 0 1px, rgba(0,0,0,0.05) 0 2px 10px;
}
</style>
