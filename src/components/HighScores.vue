<template>
  <div class="flex flex-col justify-center items-center h-screen bg-violet-700">
    <h1 class="text-green-300 text-5xl mb-5">HIGH SCORES</h1>
    <div class="bg-violet-900 p-10 rounded">
      <p class="text-red-500">RANK - USERNAME - SCORE</p>
      <div v-for="(score, index) in scores" :key="index">
        <p class="text-white flex justify-between">
          {{ index + 1 }} <span>{{ score.name }}</span>
          <span>{{ score.score }}</span>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      scores: {},
      sortedScores: {},
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
        this.scores = scores;
      });
  },
};
</script>

<style lang="scss" scoped></style>
