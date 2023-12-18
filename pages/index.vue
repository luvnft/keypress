<script setup lang="ts">
import { Posts } from "~~/utils/types";

useCustomHead("Experience keyboard-first blogging platform");

const client = useSupabaseClient();
const { data, pending } = useAsyncData(
  "posts",
  async () => {
    const { data } = await client
      .from<Posts>("posts")
      .select("*, profiles(avatar_url, name, username, domains (url, active) )")
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    return data;
  },
  { lazy: true }
);

const writeEl = ref();
const { Slash } = useMagicKeys();
watch(Slash, (n) => {
  if (n && writeEl.value) {
    writeEl.value.$el.focus();
    setTimeout(() => {
      writeEl.value.$el.click();
    }, 300);
  }
});
</script>

<template>
  <div class="pb-20">
    <div class="relative my-20 md:my-30 text-center">
      <div class="z-100">
        <h1 class="text-4xl md:text-6xl font-bold">
          Free.W3W.Web5<br />
          Arvrtising Platform
        </h1>

        <h2 class="mt-8 text-xl md:text-3xl font-semibold text-gray-300">
          Arvrtise.link let's you write your post <br />
          with only /
        </h2>

        <div class="mt-12 flex flex-col items-center justify-center">
          <NuxtLink ref="writeEl" class="btn-primary text-xl" to="/write">Press '/' to write</NuxtLink>
          <span class="text-sm mt-2 text-gray-300">or 'Tab' to Navigate</span>
        </div>
      </div>
    </div>

    <NuxtLink to="https://github.com/luvnft/keypress" target="_blank" class="w-full relative block">
      <NuxtImg
        style="object-position: 0 20%"
        class="w-full h-60 md:h-80 object-cover rounded-2xl"
        src="https://i.imgur.com/4w3CGNp.jpg"
        alt="Arvrtise Link"
      />
      <h3 class="absolute left-4 md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:text-3xl font-normal">
      <span class="block mb-2">📍 What3Words Address</span>
      <span class="block mb-2">🏦 Arvrtise.X Crypro Escrow ($BTC $ETH $SOL $MATIC)</span>
      <span class="block mb-2">🅰️ Team Name</span>
      <span class="block mb-2">🏢 CRE CLUB Name</span>
      <span class="block mb-2">🏘️ ADUBNB Name</span>
      <span class="block mb-2">💖 HealXYZ Name</span>
      <span class="block mb-2">🪙 LUV GAMES Name</span>
      </h3>
    </NuxtLink>

    <h2 class="mt-20 text-4xl font-bold">Posts</h2>
    <Loader v-if="pending"></Loader>
    <ul v-else class="mt-4">
      <li v-for="post in data">
        <PostCard :post="post"></PostCard>
      </li>
    </ul>
  </div>
</template>
