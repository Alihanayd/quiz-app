<template>
  <div class="bg-violet-700 flex justify-center items-center h-screen">
    <div class="bg-violet-900 p-10 rounded">
      <p class="text-center text-xl text-white">Your Score : {{ score }}</p>
      <button
        class="w-32 h-10 bg-emerald-600 text-white rounded-md cursor-pointer mt-8"
        type="button"
        @click="HighScores"
      >
        High Scores
      </button>
      <div>
        <button
          class="w-32 h-10 bg-red-600 text-white rounded-md cursor-pointer mt-8"
          type="button"
          @click="playAgain"
        >
          Play Again
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
      score: 0,
    };
  },
  mounted() {
    axios
      .get("https://quiz-app-f3384-default-rtdb.firebaseio.com/scores.json")
      .then((response) => {
        const data = response.data;
        const scores = [];
        for (const key in data) {
          const score = data[key];
          scores.push(score);
        }
        console.log(scores);
        const userScore = scores.find(
          (score) => score.name === this.$store.getters["user/getName"]
        );
        this.score = userScore.score;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    playAgain() {
      this.$router.push("/");
    },
    HighScores() {
      this.$router.push("/highscores");
    },
  },
};
</script>

<style lang="scss" scoped></style>
