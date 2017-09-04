<template>
  <form class="FormFields" @submit.prevent="submit">
    <InputField
      label="Your yearly income"
      :value.sync="profile.income"
    />
    <SelectField
      label="Your age"
      :value.sync="profile.age"
      :options="getAges"
    />
    <SelectField
      label="Industry Types"
      :value.sync="profile.industry"
      :options="getIndustryTypes"
    />
    <InputField
      label="Postcode"
      :value.sync="profile.postcode"
    />
    <RadioGroup
      :value.sync="profile.gender"
      :options="['Male', 'Female']"
    />
    <button
      class="FormFields__Btn"
      type="submit"
      :disabled="disabled"
    >{{isSubmitted ? 'Update' : 'Find out'}}</button>
    <p><small>We don't store any of your details.</small></p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';

export default {
  props: ['submitted', 'disabled'],
  components: {
    RadioGroup,
    SelectField,
    InputField,
  },
  data() {
    return {
      isSubmitted: false,
      profile: {
        income: 20000,
        postcode: 7000,
        age: '25 - 29',
        gender: 'Male',
        industry: 'Professional, Scientific and Technical Services',
      },
    };
  },
  computed: {
    ...mapGetters([
      'getIndustryTypes',
      'getAges',
    ]),
  },
  methods: {
    submit() {
      this.isSubmitted = true;
      this.submitted(Object.assign({}, this.profile));
    },
  },
};
</script>

<style scoped lang="stylus">
.FormFields {
  &__Btn {
    border-radius: 99px;
    background: #499aff;
    padding: 1rem 2rem;
    color: #fff;
    border: 0;
    box-shadow: inset rgba(0,0,0,.15) 0 -2px 0;
    font-size: 0.875rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    width: 100%;
    margin: 1rem 0;

    &[disabled] {
      opacity: .5;
      cursor: not-allowed;
    }

    &:hover,
    &:active,
    &:focus {
      outline: 0;
      box-shadow: inset rgba(0,0,0,.15) 0 -2px 0, rgba(0,0,0,.125) 0 2px 1rem;
    }
  }
}
</style>
