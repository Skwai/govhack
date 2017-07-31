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
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 3px;
  box-shadow: rgba(0,0,0,0.05) 0 0 0 1px, rgba(0,0,0,0.05) 0 2px 10px;
}
</style>
