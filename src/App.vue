<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello';
import SheetsService from './services/Sheets';

export default {
  name: 'app',
  components: {
    Hello,
  },
  async created() {
    const sheets = new SheetsService({
      cols: ['Foo', 'Bar', 'Baz'],
      sheetId: '1xnKLKn-eVDguXzArz9uHbT3ACeLfYSBzmmB0DAy0dvM',
    });
    const rows = await sheets.loadData();
    console.log(rows);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
