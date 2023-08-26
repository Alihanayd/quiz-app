<template>
  <div class="flex flex-col justify-around items-center h-screen bg-violet-700">
    <app-title />
    <div class="flex justify-center flex-col">
      <div class="mb-5 flex flex-col">
        <input
          v-model="name"
          class="rounded p-1"
          placeholder="Please enter your name"
          type="text"
        />
        <span class="text-red-500" v-if="isValidName">Please enter a name</span>
      </div>
      <div class="mb-5">
        <select
          v-model="selectedCategory"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled value="">Please Choose a Category</option>
          <option
            v-for="category in categories"
            :value="category"
            :key="category.number"
          >
            {{ category.name }}
          </option>
        </select>
        <span class="text-red-500" v-if="isValidCategory"
          >Please Choose a Category</span
        >
      </div>
      <div class="mb-5">
        <select
          v-model="difficulty"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled value="">Please Choose a Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <span class="text-red-500" v-if="isValidDifficulty"
          >Please Choose a Difficulty</span
        >
      </div>

      <button
        @click="getQuestions"
        class="w-52 h-8 bg-red-600 text-white rounded-md cursor-pointer mb-5"
      >
        Continue
      </button>
      <button
        @click="$router.push('/highscores')"
        class="w-52 h-8 bg-emerald-600 text-white rounded-md cursor-pointer"
      >
        High Scores
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppTitle from "./AppTitle.vue";

export default {
  components: {
    AppTitle,
  },
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
      isValidName: false,
      isValidDifficulty: false,
      isValidCategory: false,
    };
  },
  methods: {
    checkError() {
      this.resetErrors();
      if (this.name === "") {
        this.isValidName = true;
        return true;
      }
      if (this.selectedCategory === "") {
        this.isValidCategory = true;
        return true;
      }
      if (this.difficulty === "") {
        this.isValidDifficulty = true;
        return true;
      }
      return false;
    },
    resetErrors() {
      this.isValidName = false;
      this.isValidDifficulty = false;
      this.isValidCategory = false;
    },
    // "https://opentdb.com/api.php?amount=10&category=" + this.selectedCategory.number + "&difficulty=" + this.difficulty + "&type=multiple"
    getQuestions() {
      if (this.checkError()) {
        return;
      }
      axios
        .get("https://opentdb.com/api.php", {
          params: {
            amount: 10,
            category: this.selectedCategory.number,
            difficulty: this.difficulty,
            type: "multiple",
          },
        })
        .then(async (response) => {
          this.questions = response.data.results;
          console.log(this.questions);
          const questionsStoreArray = [];
          this.questions.map((questionObject, index) => {
            const options = [
              {
                answer: questionObject.correct_answer,
                correct: true,
              },
              {
                answer: questionObject.incorrect_answers[0],
                correct: false,
              },
              {
                answer: questionObject.incorrect_answers[1],
                correct: false,
              },
              {
                answer: questionObject.incorrect_answers[2],
                correct: false,
              },
            ];
            const question = {
              id: index,
              question: questionObject.question,
              options: this.randomizeAnswers(options),
            };
            questionsStoreArray.push(question);
          });
          console.log(questionsStoreArray);
          await this.$store.dispatch(
            "questions/setQuestions",
            questionsStoreArray
          );
          const storeQuestions = this.$store.getters["questions/getQuestions"];

          storeQuestions.length > 0 && (await this.$router.push("/questions"));
          // storeQuestions.length > 0 ? await this.$router.push('/questions') : alert('Please select a category and difficulty');

          // if (storeQuestions.length > 0) {
          //   await this.$router.push('/questions');
          // }
          this.$store.dispatch("user/setName", this.name);
          console.log(this.name);
          console.log(this.$store.getters["user/getName"]);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    randomizeAnswers(options) {
      return options.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style lang="scss" scoped></style>
