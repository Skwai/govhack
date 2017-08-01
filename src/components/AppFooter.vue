<template>
  <footer class="AppFooter">
    <p><small>Data from <abbr title="Australian Taxation Office">ATO</abbr> income data.</small></p>
    <p><small>
        By
        <span itemprop="author" itemscope itemtype="http://schema.org/Person">
          <meta itemprop="name" content="Cameron Jensen">
          <a itemprop="sameAs" href="https://twitter.com/skwai">@skwai</a>
        </span>
        &amp;
        <span itemprop="author" itemscope itemtype="http://schema.org/Person">
          <meta itemprop="name" content="William Bowling">
          <a itemprop="sameAs" href="https://twitter.com/wcbowling">@wcbowling</a>
        </span>
      </small></p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
.AppFooter {
  margin-top: auto;

  abbr {
    border: 0;
  }

  p {
    margin: 0.25em 0;
  }

  a {
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
