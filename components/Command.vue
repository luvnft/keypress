<template>
  <div>
    <button class="btn-plain" @click="isVisible = true">⌘K</button>

    <Modal class="!items-start" inner-class="!max-w-screen-sm rounded-xl mt-48" v-model:open="isVisible">
      <div class="p-2">
        <div>
          <input
            type="text"
            class="not-default p-2 w-full focus-visible:outline-none text-sm"
            v-model="searchTerm"
            placeholder="Search for commands..."
          />
        </div>

        <div class="py-6">
          <ul v-if="results?.length">
            <div class="text-xs p-2">Navigation</div>
            <li v-for="{ item } in results">
              <button
                @click="item.action()"
                class="not-default outline-none bg-transparent focus-visible:bg-light-300 rounded-lg transition-all p-2 my-0.5 w-full text-left text-sm"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
          <div v-else class="p-8 text-sm text-center">No results found.</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { useFuse } from "@vueuse/integrations/useFuse"
  import { ref, computed, watch } from "vue"

  const isVisible = ref(false)
  const searchTerm = ref("")
  const navList = ref([
    { label: "💸 LUV GAMES", value: "luvGames", action: () => navAction("https://discord.com/channels/910051231437819914/shop"), show: true },
    { label: "💖 HealXYZ", value: "healXYZ", action: () => navAction("https://discord.gg/cNJH5pXMBN"), show: true },
    { label: "🏘️ ADUBNB", value: "aduBnb", action: () => navAction("https://discord.com/channels/1164180431181201438/shop"), show: true },
    { label: "🏢 CRE CLUB", value: "creClub", action: () => navAction("https://cre.arvrtise.com"), show: true },
    { label: "🅰️ Team Discord link", value: "teamDiscord", action: () => navAction("https://discord.gg/VMSpbUPYES"), show: true },
    // Your existing navigation items here
    { label: "Home", value: "home", action: () => navAction("/"), show: true },
    { label: "Write", value: "write", action: () => navAction("/write"), show: true },
    // ... (other existing items)
  ])

  const { results } = useFuse(
    searchTerm,
    navList.value.filter((i) => i.show),
    {
      fuseOptions: {
        keys: ["label"],
      },
      matchAllWhenSearchEmpty: true,
    }
  )

  const navAction = (path: string) => {
    window.location.href = path
  }

  const CmdK = ref(false)
  const Escape = ref(false)

  watch(CmdK, (v) => {
    if (v) {
      isVisible.value = !isVisible.value
    }
  })
  watch(Escape, () => {
    isVisible.value = false
  })
</script>
