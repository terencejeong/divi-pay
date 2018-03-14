<template>
  <div>
    <h1>DiviPay Accounts</h1>
    <ul v-for="account in accounts">
      <br>
      <li><h2>Account Name: {{account.name}} | Balance: {{account.balance}} | Email: {{account.email}} | ID: {{account._id}}</h2></li>
    </ul>
     <v-btn class="transaction" color="info" :to="{ path: '/transaction'}">Make a transaction</v-btn>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      accounts: []
    }
  },
  created() {
    axios.get(`http://localhost:3000/accounts`).then(response => {
      this.accounts = response.data;
    });
  }
};
</script>

<style>
  .transaction{
    color: green !important
  }
</style>
