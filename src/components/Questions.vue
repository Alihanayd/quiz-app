<template>
  <div>
    <div v-for="(question, index) in questions" :key="index">
      <div>
        <p>{{ question.question }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    this.$store.state.questions = this.questions;
  },
};
</script>

<style lang="scss" scoped></style>
