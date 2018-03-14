<template>
    <div>
      <h1>Welcome to DiviPay Bank</h1>
        <h2>Create an account and get $100 AUD</h2>
          <v-flex column xs6 offset-xs3>
         <v-form  class="text-xs-center" ref="form">
          <v-text-field
            label="Name"
            v-model="name"
            required
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="email"
            required
          ></v-text-field>
          <v-btn
            class="text-xs-center"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn
          class="text-xs-center"
          @click="clear">clear</v-btn>
        </v-form>
        </v-flex>
      </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Welcome",
  data() {
    return {
      name: "",
      email: "",
      accounts: []
    };
  },
  methods: {
    submit() {
      axios
        .post(`http://localhost:3000/newaccount`, {
          name: this.name,
          email: this.email
        })
        .then(response => {}, this.$router.push('/accounts'))
        .catch(e => {
          this.errors.push(e);
        });
    },
    clear() {
      this.name = "";
      this.lastName = "";
    }
  },
  created() {
    axios.get(`http://localhost:3000/accounts`).then(response => {
      this.accounts = response.data;
    });
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

form-control {
  padding-left: 20px;
}
</style>
