<template>
  <main class="App">
    <div class="App__Sidebar">
      <AppHeader></AppHeader>
      <FormFields
        :submitted="updateProfile"
        :disabled="loading"
      ></FormFields>
      <AppFooter></AppFooter>
    </div>
    <div class="App__Content">
      <Loading v-if="loading"></Loading>
      <Error v-if="error" :error="error"></Error>
      <transition name="fade">
        <DataVisuals :profile="profile" v-if="hasProfile"></DataVisuals>
      </transition>
      <GlobalVisuals v-if="showOverview"></GlobalVisuals>
    </div>
  </main>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import FormFields from './components/FormFields';
import Loading from './components/Loading';
import Error from './components/Error';
import DataVisuals from './components/DataVisuals';
import GlobalVisuals from './components/GlobalVisuals';
import Sheet from './services/Sheet';

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
    hasProfile() {
      return this.profile;
    },
    showOverview() {
      return !this.loading && !this.error && !this.profile;
    },
  },
  methods: {
    updateProfile(profile) {
      this.profile = profile;
    },
  },
  components: {
    FormFields,
    Loading,
    Error,
    DataVisuals,
    AppHeader,
    GlobalVisuals,
    AppFooter,
  },
  async created() {
    try {
      const ages = await (new Sheet({
        cols: ['Gender', 'State', 'Age', 'Count', 'Income Sum', 'Average Income'],
        sheetId: '112usd1vZmqUsTyqS_Qo4aKlI9DxZ8p4k2c4rVC3oVCI',
      })).loadData();

      const postcodes = await (new Sheet({
        cols: ['State', 'Postcode', 'Average', 'Median', 'Count'],
        sheetId: '1716gXW9rhxUCkcpzt7Wgy7B-Z55AdNELEH_XZ4PNYHs',
      })).loadData();

      this.$store.commit('insertAges', ages);
      this.$store.commit('insertPostcodes', postcodes);
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
  font-size: 87.5%
  opacity: .5
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter,
.fade-leave-to {
  opacity: 0
}

.App {
  text-align: center;
  background: #f1f2f3;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }

  &__Content {
    padding: 2rem;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__Sidebar {
    background: #fff;
    padding: 2rem;
    box-shadow: rgba(0,0,0,.05) 0 0 0 1px, rgba(0,0,0,.05) 0 0 10px;
    position: relative;
    z-index: 2;
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;

    @media (min-width: 640px) {
      flex: 0 0 20rem;
      min-height: 100vh;
    }
  }

}
</style>
