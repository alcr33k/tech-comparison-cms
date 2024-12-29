<template>
  <div class="bg-slate-600 grid grid-cols-12 h-screen">
    <div class="items-center col-start-3 col-span-8 h-screen">
      <select
        id="underline_select"
        class="my-8 bg-slate-700 text-slate-50 py-2.5 px-0 w-full text-sm border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        @change="navigateToArticle($event)"
      >
        <option disabled selected>Article</option>
        <option v-if="articles" v-for="article in articles" :value="article.id">
          {{ `Article ${article.id} - ${article.title}` }}
        </option>
      </select>
    </div>
  </div>
</template>


<script setup>
  const { data } =  await useFetch('/api/articles')
  const articles = data?.value?.articles
  const router = useRouter()

  function navigateToArticle(event) {
    const articleId = event.target.value
    if (articleId) {
      navigateTo(`/${articleId}`)
    }
  }
</script>
