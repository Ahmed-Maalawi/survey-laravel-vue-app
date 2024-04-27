<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center p-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Surveys
        </h1>
        <router-link
          :to="{name: 'SurveyCreate'}"
          class="btn bg-green-500 hover:bg-green-300 border rounded ho px-4 py-2">
          Create
        </router-link>
      </div>
    </template>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="survey in surveys"
        :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
      >
<!--        <pre>{{ survey }}</pre>-->
        <img :src="survey.image" alt="" class="w-full h-48 object-cover">
        <h4 v-html="survey.description" class="overflow-hidden flex-1"></h4>

        <div class="flex justify-between items-center mt-3">
          <router-link
            class="btn border rounded bg-blue-600 hover:bg-blue-300 px-4 py-2 text-white"
            :to="{ name: 'SurveyView', params: {id: survey.id} }"
          >
            Edit
          </router-link>

          <button
            v-if="survey.id"
            type="button"
            @click="deleteSurvey(survey)"
            class="btn border rounded bg-red-600 hover:bg-red-300 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

const surveys =  computed(() => store.state.surveys);

function deleteSurvey(survey) {
  if (confirm(`Are you sure you want to delete this survey? Operation can't be undone!!`)) {

  }
}


</script>
