<template>
  <div>
    <div v-for="(question, index) in questions" :key="index">
      <div>
        <p>{{ question.question }}</p>
      </div>

      <div v-for="(answer, index) in question.options" :key="index">
        <input type="radio" :id="index + '_' + question.id" :name="question.id" :value="answer.correct"/>
        <label :for="index + '_' + question.id">{{ answer.answer }}</label>
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
    this.questions = this.$store.getters['questions/getQuestions'];
  },
};
</script>

<style lang="scss" scoped></style>
