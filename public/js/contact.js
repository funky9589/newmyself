
const app = Vue.createApp({
    data() {
      return {
        email: "",
        message: "",
        feedback: "",
      };
    },
    methods: {
      submitForm() {
        if (this.email && this.message) {
          fetch("/contact_me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.email, message: this.message }),
          })
            .then((response) => {
              if (!response.ok) throw new Error("提交失敗");
              return response.json();
            })
            .then((data) => {
              this.feedback = `提交成功！我們會盡快回復！ (聯絡信箱: ${data.data.email})`;
              this.email = "";
              this.message = "";
            })
            .catch(() => {
              this.feedback = "提交失敗，請稍後再試。";
            });
        } else {
          this.feedback = "請填寫所有欄位！";
        }
      },
    },
  });
  app.mount("#app");
