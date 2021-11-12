<template>
      <Layout />
</template>

<script>
import Layout from './components/Layout';
import { mapGetters } from "vuex";

export default {
  name: 'App',

  components: {
    Layout,
  },

  computed: {
    ...mapGetters(["isLoggedIn", "userType", "userName", "userEmail"]),
  },

  mounted() {
    let adsConstantScript = document.createElement("script");
    adsConstantScript.setAttribute('type', 'text/javascript');
    adsConstantScript.innerHTML =
      'const PUBLISHER_CODE = ' +
      '"AsykFIDfCfzhWXd6UGYgt5VqmDniADFEm6K8qGVoujjKKAgyGjpPnX5oNJQM00Xd9aFX3eFZOBbugC1KlLIWmrFBqmBKXHxZ5vr9eCE02eKi9pPoAeK02VYzKRO8ZXP3XQcKw3CKXhIEm5kbSid6AGp8UBPnwtS8HxF7tOpe0pS9hzJCvULGHBU2KHqZa9xl9eKwdLBxFOEsteSeYS5twSeRWf03wY5osy7qhnz5uH03aUcJg27LUHV2PM7Qni3";';
    document.head.appendChild(adsConstantScript);

    let adsScript = document.createElement("script");
    adsScript.setAttribute(
      "src",
      "http://localhost:8000/static/js/ads_cdn.js"
    );
    document.head.appendChild(adsScript);
    
    let adsVisitorInfoScript = document.createElement("script");
    adsVisitorInfoScript.setAttribute('type', 'text/javascript');
    adsVisitorInfoScript.innerHTML =
     `const EMAIL = '${this.userEmail}'; const NAME = '${this.userName}';`;
    document.head.appendChild(adsVisitorInfoScript);
  }
};
</script>
<!-- from Ads engine -->
<style>
  @import 'http://localhost:8000/static/css/ads_cdn.css';
</style>
