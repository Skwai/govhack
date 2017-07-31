<template>
  <form class="FormFields" @submit.prevent="submit">
    <InputField
      label="Your yearly income"
      :value.sync="profile.income"
    />
    <SelectField
      label="Your age"
      :value.sync="profile.age"
      :options="ageOptions"
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
    <p><small>Data sourced from ATO income data.</small></p>
  </form>
</template>

<script>
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import config from '../config';

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
      ageOptions: config.AGES,
      profile: {
        income: '',
        postcode: '',
        age: '',
        gender: '',
      },
    };
  },
  methods: {
    submit() {
      this.isSubmitted = true;
      this.submitted(this.profile);
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
