<template>
  <div class="Loading">
    <svg class="Loading__Circle" viewBox="25 25 50 50">
      <circle class="Loading__Path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
width = 4rem;

.Loading {
  position: relative;
  margin: 2rem auto
  width: width;
  height: width;
  display: block;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &__Circle {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  &__Path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #499aff;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
