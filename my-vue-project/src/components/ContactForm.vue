<template>
  <div>
    <h2>聯絡我們</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" required></textarea>
      </div>
      <button type="submit">提交</button>
    </form>
    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch("http://localhost:5500/contact_me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            message: this.message,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          this.successMessage = data.message;
          this.errorMessage = "";
          this.email = "";
          this.message = "";
        } else {
          const error = await response.json();
          this.errorMessage = error.error;
        }
      } catch (error) {
        this.errorMessage = "提交失敗，請稍後再試。";
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
