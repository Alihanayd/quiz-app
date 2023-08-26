<template>
  <div class="flex justify-center items-center h-screen bg-violet-700">
    <!-- <div v-for="(question, index) in questions" :key="index">
      <div>
        <p>{{ question.question }}</p>
      </div>

      <div v-for="(answer, index) in question.options" :key="index">
        <input type="radio" :id="index + '_' + question.id" :name="question.id" :value="answer.correct"/>
        <label :for="index + '_' + question.id">{{ answer.answer }}</label>
      </div>

    </div> -->
    <div class="flex flex-col items-center bg-violet-900 p-10 rounded-lg">
      <div class="text-center">
        <p class="text-white">{{ questions[currentIndex]?.question }}</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div
          v-for="(answer, index) in questions[currentIndex]?.options"
          :key="index"
          class="flex items-center px-4 py-2 border text-white border-gray-200 rounded user-select-none cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-600 dark:border-gray-600"
          :class="{ 'bg-blue-700': index === activeIndex }"
          @click="checkAnswer(answer.correct, index)"
        >
          {{ answer.answer }}
          <!-- <input
            type="radio"
            :key="index + '_' + answer.answer"
            :id="index + '_' + answer.answer"
            :name="questions[currentIndex]?.id"
            :value="answer.correct"
            :checked="false"
            v-model="isAnswerCorrect"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            :for="index + '_' + answer.answer"
            class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{ answer.answer }}</label
          > -->
        </div>
      </div>
      <div class="mt-4">
        <button
          @click="nextQuestion"
          class="w-52 h-8 bg-red-600 text-white rounded-md cursor-pointer"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      questions: [],
      currentIndex: 0,
      score: 0,
      isAnswerCorrect: null,
      activeIndex: null,
    };
  },
  mounted() {
    this.questions = this.$store.getters["questions/getQuestions"];
  },
  methods: {
    nextQuestion() {
      if (this.isAnswerCorrect) {
        this.score++;
      }
      this.activeIndex = null;
      this.isAnswerCorrect = null;
      this.currentIndex < this.questions.length - 1
        ? this.currentIndex++
        : this.setScore();
    },
    setScore() {
      axios
        .post(
          "https://quiz-app-f3384-default-rtdb.firebaseio.com/scores.json",
          {
            name: this.$store.getters["user/getName"],
            score: this.score,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/results");
        })
        .catch((error) => console.log(error));
    },
    checkAnswer(answer, index) {
      this.isAnswerCorrect = answer;
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped></style>
