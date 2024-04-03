<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center p-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          view or create a survey
        </h1>
      </div>
    </template>
  </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import {useRoute} from "vue-router";
import store from "../store/index.js";
import {ref} from "vue";

const route = useRoute();
export default {
  name: "SurveyView",
  components: { PageComponent },
  data() {
    return {
      surveys: [],
      model: ref({
        title: "",
        status: false,
        description: null,
        image: null,
        expire_date: null,
        questions: [],
      }),
    }
  },
  mounted() {
    if(route.params.id) {
      this.model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
      )
  }


}
}
</script>

<style scoped>

</style>
