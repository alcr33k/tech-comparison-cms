<template>
  <div class="bg-slate-600 grid grid-cols-12 h-min-screen" :style="{ minHeight: minHeight + 'px' }">
    <div class="items-center col-start-3 col-span-8 h-screen">
      <select
        id="underline_select"
        class="my-8 mb-0 bg-slate-700 text-slate-50 py-2.5 px-1.5 w-full text-sm border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        @change="navigateToArticle($event)"
      >
        <option disabled selected>Article</option>
        <option v-if="articles" v-for="article in articles" :value="article.id">
          {{ `Article ${article.id} - ${article.title}` }}
        </option>
      </select>

      <div class="w-full flex justify-between py-2 mt-4 mb-0">
        <button
          @click="prev()"
          class="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 focus:outline-none text-sm"
        >
          Prev
        </button>
        <button 
          @click="next()"
          class="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 focus:outline-none text-sm"
        >
          Next
        </button>
      </div>

      <text-area  
        v-for="(section, index) in sections"
        :key="index"
        :title="section.title"
        :index="index"
        v-model="section.content"
        @heightChanged="updateMinHeight" 
      />

      <div class="flex flex-col justify-center items-center gap-4 my-4">
        <button @click="save" class="bg-green-800 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg shadow-2xl border-4 border-green-900 transform transition duration-200 hover:scale-110" :class="{ save: saving }">
            Spara
        </button>
        <span class="text-slate-50 font-semibold" v-if="sucessfulSave">Successfully saved!</span>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { ref, onMounted } from 'vue'
  const route = useRoute()
  const id = route.params?.id

  const { data: articleData } =  await useFetch('/api/articles')
  const articles = articleData?.value?.articles

  const articleUrl = articles.find(article => article.id === id)?.url
  
  const { articleContent } = await $fetch('/api/articleContent', {
    method: 'post',
    body: { articleUrl }
  })

  const sections = reactive([
    { title: 'Intro', key: 'intro', content: '' },
    { title: 'Design', key: 'design', content: '' },
    { title: 'Hardware', key: 'hardware', content: '' },
    { title: 'Battery', key: 'battery' },
    { title: 'Performance', key: 'performance', content: '' },
    { title: 'Price Comparison', key: 'priceComparison', content: '' },
    { title: 'Screen', key: 'screen', content: '' },
    { title: 'User Reviews', key: 'userReviews', content: '' },
    { title: 'Reason to Get Laptop 1', key: 'reasonsToGetLaptop1', content: '' },
    { title: 'Reason to Get Laptop 2', key: 'reasonsToGetLaptop2', content: '' }
  ])

  const minHeight = ref(1080)

  const updateMinHeight = (height, index) => {
    sections[index].height = height;  // Store height in the sections array
    recalculateMinHeight();
  }

  const recalculateMinHeight = () => {
    minHeight.value = sections.reduce((total, section) => total + (section.height + 72 || 0), 0) + 144;
  }

  onMounted(() => {
    sections.forEach(section => {
      section.content = articleContent[section.key] || '';
    })
  })

  const sucessfulSave = ref(false)
  const saving = ref(false)

  const save = async () => {
    const sectionsWithContent = sections.reduce((acc, section) => {
      if (section.content !== '') {
        acc[section.key] = section.content
      }
      return acc
    }, {})

    saving.value = true
    const { updateArticle } = await $fetch('/api/updateArticle', {
      method: 'post',
      body: {
        articleId: id,
        sectionsToChange: sectionsWithContent
      }
    })
    saving.value = false
    if (updateArticle === true) {
      sucessfulSave.value = true
    }
  }

  const router = useRouter()

  function navigateToArticle(event) {
    const articleId = event.target.value
    if (articleId) {
      navigateTo(`/${articleId}`)
    }
  }

  function prev () {
    const newId = parseInt(id) - 1
    navigateTo(`/${newId.toString()}`)
  }

  function next () {
    const newId = parseInt(id) + 1
    navigateTo(`/${newId.toString()}`)
  }
</script>

<style scoped>
  .save {
    background-color: lightgreen !important;
  }
</style>