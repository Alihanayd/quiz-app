<template>
  <div class="flex flex-col justify-around items-center h-screen bg-violet-700">
    <div class="">
      <app-title />
    </div>
    <div class="flex justify-center flex-col">
      <input
        v-model="name"
        class="mb-5 rounded p-1"
        placeholder="Please enter your name"
        type="text"
      />

      <select
        v-model="selectedCategory"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
      >
        <option disabled value="">Please Choose a Category</option>
        <option
          v-for="category in categories"
          :value="category"
          :key="category.number"
        >
          {{ category.name }}
        </option></select
      ><select
        v-model="difficulty"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
      >
        <option disabled value="">Please Choose a Difficulty</option>
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select>
      <button
        @click="getQuestions"
        class="w-52 h-8 bg-red-600 text-white rounded-md cursor-pointer"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppTitle from "./AppTitle.vue";
export default {
  data() {
    return {
      questions: [],
      difficulty: "",
      categories: [
        { name: "general knowledge", number: 9 },
        { name: "books", number: 10 },
        { name: "film", number: 11 },
        { name: "music", number: 12 },
        { name: "television", number: 14 },
        { name: "video games", number: 15 },
        { name: "computers", number: 18 },
        { name: "mathematics", number: 19 },
        { name: "sports", number: 21 },
        { name: "history", number: 23 },
        { name: "art", number: 25 },
        { name: "celebrities", number: 26 },
        { name: "animals", number: 27 },
        { name: "vehicles", number: 28 },
        { name: "comics", number: 29 },
        { name: "gadgets", number: 30 },
        { name: "japanese anime & manga", number: 31 },
        { name: "cartoon & animations", number: 32 },
      ],
      selectedCategory: "",
      name: "",
      questionSplit: {},
    };
  },
  components: {
    AppTitle,
  },
  methods: {
    getQuestions() {
      axios
        .get(
          "https://opentdb.com/api.php?amount=10&category=" +
            this.selectedCategory.number +
            "&difficulty=" +
            this.difficulty +
            "&type=multiple"
        )
        .then((response) => {
          this.questions = response.data.results;
          this.questionSplit = this.questions.map((question) => {
            return {
              question: question.question,
              answers: [
                question.correct_answer,
                ...question.incorrect_answers,
              ].sort(() => Math.random() - 0.5),
            };
          });
          console.log(this.questionSplit);
        })
        .then(() => {
          this.$store.commit("setQuestions", this.questionSplit);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
