<template>
  <div>
    <h1>Transactions</h1>
    <!-- - Need to make the call to the API so it can change the amount(or at least show the amount) depending on the rate.
    - When submitting form, the amount should be converted to AUD   -->
          <v-flex>
         <v-form  class="text-xs-center" ref="form" lazy-validation>
           <label for="currency" class="labelHeader">Currency</label>
             <select
                 class="currencyStyles"
                 v-model="selectedCurrency">
               <option v-for="currency in currencies" class="labelHeader">{{currency}}</option>
             </select>
           <label for="payer" class="labelHeader">Payer</label>
            <select
               class="currencyStyles"
               v-model="selectedPayer">
               <option v-for="payer in accounts">{{payer.name}}</option>
             </select>
           <label for="payer" class="labelHeader">Payee</label>
             <select
               class="currencyStyles"
               v-model="selectedPayee">
               <option v-for="payee in accounts">{{payee.name}}</option>
             </select>
           <br>
          <v-text-field
          v-model="selectedAmount"
          type="number"
          label="Amount"
          placeholder="please add an amount"
          >
          </v-text-field>
        </v-form>
        </v-flex>
        <p>Currency : {{selectedCurrency}}</p>
        <p> Payer : {{selectedPayer}} </p>
        <p>Payee : {{selectedPayee}}</p>
        <p> Amount: {{amount}}</p>
        <p v-if="selectedCurrency != null && selectedAmount != null">Amount : {{exchangeRate()}}</p>
          <v-btn
            class="text-xs-center"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn
          class="text-xs-center"
          @click="clear">clear</v-btn>
      </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Transaction",
  data(){
    return {
      name: "",
      accounts: [],
      currencies: ['AUD', 'EUR', 'USD'],
      selectedCurrency: null,
      selectedPayer: null,
      selectedPayee: null,
      selectedAmount: null,
      amount:""
    }
  },
  computed: {
    exchangeRate(){
      axios.get(`https://www.divipay.com/secure/currency/${selectedCurrency}/`).then(response => {
        return this.amount = this.selectedAmount * response
      })
    }
  },
  created() {
    axios.get(`http://localhost:3000/accounts`).then(response => {
      this.accounts = response.data;
    })
    }
  }
</script>


<style lang="css">

.labelHeader{
  font-size: 2.5rem;
}

.currencyStyles{
  border: 1px solid black
}

</style>
