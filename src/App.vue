<template>
  <main class="App">
    <div class="App__Form">
      <AppHeader></AppHeader>
      <FormFields :submitted="updateProfile"></FormFields>
    </div>
    <div class="App__Content">
      <Loading v-if="loading"></Loading>
      <Error v-if="error" :error="error"></Error>
      <DataVisuals v-if="showData"></DataVisuals>
    </div>
  </main>
</template>

<script>
import AppHeader from './components/AppHeader';
import FormFields from './components/FormFields';
import Loading from './components/Loading';
import Error from './components/Error';
import DataVisuals from './components/DataVisuals';

import SheetsService from './services/Sheets';
import StatsService from './services/Stats';


const ERROR_MESSAGE = 'Couldn\'t load data :(';

export default {
  data() {
    return {
      loading: true,
      error: null,
      stats: null,
      profile: null,
    };
  },
  computed: {
    showData() {
      return !this.loading && !this.error; // && this.profile;
    },
  },
  methods: {
    updateProfile(profile) {
      console.log(profile);
      this.profile = profile;
    },
  },
  components: {
    FormFields,
    Loading,
    Error,
    DataVisuals,
    AppHeader,
  },
  async created() {
    try {
      const age = new SheetsService({
        cols: ['Gender', 'State', 'Age', 'Count', 'Income Sum', 'Average Income'],
        sheetId: '112usd1vZmqUsTyqS_Qo4aKlI9DxZ8p4k2c4rVC3oVCI',
      });

      const postcode = new SheetsService({
        cols: ['State', 'Postcode', 'Average', 'Median'],
        sheetId: '1716gXW9rhxUCkcpzt7Wgy7B-Z55AdNELEH_XZ4PNYHs',
      });

      const postcodeRows = await postcode.loadData();
      const ageRows = await age.loadData();
      this.stats = new StatsService({ ageData: ageRows, postcodeData: postcodeRows });
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
  font-size: 13px;

  @media (min-width: 480px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

button,
label {
  cursor: pointer;
}

body,
input,
button,
textarea {
  color: #333;
  font-size: 1rem;
  line-height: 1.375;
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

small {
  opacity: .5
}

.App {
  text-align: center;
  background: #f1f2f3;
  display: flex;
  min-height: 100vh;
  overflow: hidden;

  &__Content {
    padding: 2rem;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  &__Form {
    background: #fff;
    padding: 2rem;
    box-shadow: rgba(0,0,0,.05) 0 0 0 1px, rgba(0,0,0,.05) 0 0 10px

    @media (min-width: 640px) {
      flex: 0 0 24rem;
      min-height: 100vh;
    }
  }

}
</style>
