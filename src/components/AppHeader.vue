<template>
  <header class="AppHeader">
    <svg class="AppHeader__Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#499aff" d="M43 11c0-1.105-.895-2-2-2H6C4.346 9 3 7.654 3 6c0-.552-.448-1-1-1s-1 .448-1 1v32c0 3.866 3.134 7 7 7h33c1.105 0 2-.895 2-2V11z"/><path fill="#397ED5" d="M46 22H36c-2.757 0-5 2.243-5 5s2.243 5 5 5h10c.552 0 1-.448 1-1v-8c0-.552-.448-1-1-1zM4 3h28c1.105 0 2 .895 2 2v4H4C2.343 9 1 7.657 1 6s1.343-3 3-3z"/><circle cx="36" cy="27" r="2" fill="#fff"/></svg>
    <h1 class="AppHeader__Heading">PoorScore</h1>
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
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>
