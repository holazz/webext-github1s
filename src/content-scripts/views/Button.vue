<script setup lang="ts">
import { useConfig } from '~/config'
import Icon from '../components/Icon.vue'

import type { Config } from '~/config'

defineProps<{
  url: string
  classList: string
}>()

const Text = () => 'GitHub1s'

const config = ref({} as Config)
const { getConfig, watchConfig } = useConfig()

onBeforeMount(async () => {
  config.value = await getConfig()
})

watchConfig(val => (config.value = val))
</script>

<template>
  <a
    id="gh1s-btn"
    :class="classList"
    :href="url"
    :target="config.newTab ? '_blank' : '_self'"
    :data-hotkey="config.hotkey"
  >
    <component :is="config.type === 'text' ? Text : Icon" />
  </a>
</template>
