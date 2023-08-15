<template>
  <div class="flex flex-col justify-around items-center h-screen bg-violet-700">
    <app-title/>
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
        </option>
      </select>

      <select
          v-model="difficulty"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
      >
        <option disabled value="">Please Choose a Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
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
  components: {
    AppTitle,
  },
  data() {
    return {
      questions: [],
      difficulty: "",
      categories: [
        {name: "general knowledge", number: 9},
        {name: "books", number: 10},
        {name: "film", number: 11},
        {name: "music", number: 12},
        {name: "television", number: 14},
        {name: "video games", number: 15},
        {name: "computers", number: 18},
        {name: "mathematics", number: 19},
        {name: "sports", number: 21},
        {name: "history", number: 23},
        {name: "art", number: 25},
        {name: "celebrities", number: 26},
        {name: "animals", number: 27},
        {name: "vehicles", number: 28},
        {name: "comics", number: 29},
        {name: "gadgets", number: 30},
        {name: "japanese anime & manga", number: 31},
        {name: "cartoon & animations", number: 32},
      ],
      selectedCategory: "",
      name: "",
      questionSplit: {},
    };
  },
  methods: {

    // "https://opentdb.com/api.php?amount=10&category=" + this.selectedCategory.number + "&difficulty=" + this.difficulty + "&type=multiple"
    getQuestions() {
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
              ]
              const question = {
                id: index,
                question: questionObject.question,
                options: this.randomizeAnswers(options)
              };
              questionsStoreArray.push(question);
            });
            await this.$store.dispatch('questions/setQuestions', questionsStoreArray);
            const storeQuestions = this.$store.getters['questions/getQuestions'];

            storeQuestions.length > 0 && await this.$router.push('/questions');
            // storeQuestions.length > 0 ? await this.$router.push('/questions') : alert('Please select a category and difficulty');

            // if (storeQuestions.length > 0) {
            //   await this.$router.push('/questions');
            // }


          })
          .catch((error) => {
            alert(error.message)
          })
    },
    randomizeAnswers(options) {
      return options.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style lang="scss" scoped></style>
