<template>
  <header class="AppHeader">
    <svg class="AppHeader__Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><g fill="none" fill-rule="evenodd"><path fill="#499AFF" d="M42 8c0-1.105-.895-2-2-2H5C3.346 6 2 4.654 2 3c0-.552-.448-1-1-1s-1 .448-1 1v32c0 3.866 3.134 7 7 7h33c1.105 0 2-.895 2-2V8z"/><path fill="#3F84D9" d="M3 0h28c1.105 0 2 .895 2 2v4H3C1.343 6 0 4.657 0 3s1.343-3 3-3z"/><path fill="#FFF" d="M36.414 22.586c.78.78.78 2.047 0 2.828-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828.78-.78 2.047-.78 2.828 0"/></g></svg>
    <h1 class="AppHeader__Heading">WageSage</h1>
  </header>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.AppHeader {
  margin-bottom: 1rem;

  &__Heading {
    margin: 0;
    letter-spacing: -0.035em
    font-size: 1.75rem;
    color: #499aff;
  }

  &__Logo {
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.5rem;
  }
}
</style>
