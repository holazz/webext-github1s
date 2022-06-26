<script setup lang="ts">
import { useConfig } from '~/config'
import { version } from '../../package.json'

import type { Config } from '~/config'

const config = ref({} as Config)
const { getConfig, setConfig } = useConfig()

onBeforeMount(async () => {
  config.value = await getConfig()
})

watch(
  config,
  () => {
    setConfig(config.value)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <main p4 text-center text-gray-700 dark:text-gray-200 select-none>
    <div flex gap-2 mb3>
      <img src="../assets/icon.png" class="icon-btn h-12" />
      <div my-auto text-left>
        <div text-xl>GitHub1s</div>
        <div op50 leading-2>{{ version }}</div>
      </div>
    </div>

    <div h1px w-full class="bg-gray-400/10" />

    <div flex flex-col px2 py1>
      <label form-item>
        <span>Button Type</span>
        <select v-model="config.type" text-xs op70>
          <option value="text">text</option>
          <option value="icon">icon</option>
        </select>
      </label>

      <label form-item>
        <span>Hotkey</span>
        <input
          v-model="config.hotkey"
          type="text"
          class="w30%"
          text-xs
          op70
          px1
        />
      </label>

      <label form-item>
        <span>New Tab</span>
        <input v-model="config.newTab" type="checkbox" text-xs op70 />
      </label>
    </div>
  </main>
</template>
