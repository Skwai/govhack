<template>
  <div class="Error">
    <h2>{{error}}</h2>
    <div class="Error__Contact">Refresh your browser to try again. If it continues <a href="mailto:will@wbowling.info">please let us know</a></div>
  </div>
</template>

<script>
export default {
  props: ['error'],
};
</script>

<style scoped lang="stylus">
.Error {
  border-radius: 3px;
  text-align: center;
  padding: 1rem;
  width: 100%;

  a {
    color: inherit;
  }

  &__Icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
}
</style>
