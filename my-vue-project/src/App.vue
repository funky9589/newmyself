<template>
  <div id="app">
    <h1>歡迎來到我們的網站</h1>
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from "./components/ContactForm.vue";

export default {
  name: "App",
  components: {
    ContactForm,
  },
};
</script>
