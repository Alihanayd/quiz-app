<template>
  <div>
    <quiz-form />
    <questions />
  </div>
</template>

<script>
// @ is an alias to /src
import QuizForm from "@/components/QuizForm.vue";
import Questions from "@/components/Questions.vue";
export default {
  name: "HomeView",

  components: {
    QuizForm,
    Questions,
  },
};
</script>

<style lang="scss" scoped></style>
