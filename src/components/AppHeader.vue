<template>
  <header class="AppHeader">
    <h1 class="AppHeader__Heading">WageSage</h1>
    <p class="AppHeader__Description">Find out how your income compares to other Australians</p>
  </header>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.AppHeader {
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;

  &__Heading {
    margin: 0 0 1rem;
    letter-spacing: -0.035em
    font-size: 1.75rem;
    color: #499aff;
  }

  &__Description {
    opacity: .7;
    margin: 0 0 2rem;
  }
}
</style>
