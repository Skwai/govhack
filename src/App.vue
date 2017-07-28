<template>
  <div class="App">
    <FormFields></FormFields>
    <div class="App__Content">
      <Loading v-if="loading"></Loading>
      <Error v-if="error" :error="error"></Error>
      <!--<DataVisuals v-else></DataVisuals>-->
    </div>
  </div>
</template>

<script>
import FormFields from './components/FormFields';
import Loading from './components/Loading';
import Error from './components/Error';

import SheetsService from './services/Sheets';

const ERROR_MESSAGE = 'Could not load data';

export default {
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  components: {
    FormFields,
    Loading,
    Error,
  },
  async created() {
    try {
      const sheets = new SheetsService({
        cols: ['Foo', 'Bar', 'Baz'],
        sheetId: '1xnKLKn-eVDguXzArz9uHbT3ACeLfYSBzmmB0DAy0dvM',
      });
      const rows = await sheets.loadData();
      console.log(rows);
    } catch (err) {
      this.error = ERROR_MESSAGE;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="stylus">
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
  font-size: 1rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  text-align: center;
  background: #f1f2f3;
  display: flex;
  min-height: 100vh;

  &__Content {
    padding: 1rem;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>
