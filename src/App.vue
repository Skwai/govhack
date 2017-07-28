<template>
  <div class="App">
    <FormFields></FormFields>
    <Loading v-if="loading"></Loading>
    <DataVisuals v-else></DataVisuals>
  </div>
</template>

<script>
import FormFields from './components/FormFields';
import SheetsService from './services/Sheets';

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    FormFields,
  },
  async created() {
    try {
      const sheets = new SheetsService({
        cols: ['Foo', 'Bar', 'Baz'],
        sheetId: '1xnKLKn-eVDguXzArz9uHbT3ACeLfYSBzmmB0DAy0dvM',
      });
      const rows = await sheets.loadData();
      console.log(rows);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
html {
  font-size: 16px;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

body,
input,
button,
textarea {
  color: #333;
  font-size: 0.9125rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  text-align: center;
  background: #f1f2f3;
  display: flex;
  min-height: 100vh;
}
</style>
