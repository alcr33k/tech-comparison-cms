<template>
  <div v-if="modelValue">
    <h2 class="text-2xl font-semibold text-slate-50 my-2 md:text-3xl">{{ title }}</h2>
    <textarea 
      class="resize-none overflow-hidden bg-slate-700 text-slate-50 w-full min-h-[6rem] p-2"
      ref="textareaRef"
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'

  const props = defineProps({
    modelValue: String,
    title: String,
    index: Number
  })
  const emit = defineEmits(['update:modelValue', 'heightChanged'])
  const textareaRef = ref(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
      emit('heightChanged', textarea.scrollHeight, props.index)
    }
  };

  onMounted(() => {
    setTimeout(resizeTextarea, 10)
  })

  watch(() => props.modelValue, resizeTextarea)

  const onInput = (event) => {
    emit('update:modelValue', event.target.value)
  };
</script>