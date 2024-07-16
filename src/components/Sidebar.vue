<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Avatar from '@/components/Avatar.vue';
import { SidebarConfig, SiteConfig } from '@/config';
import { ReportStatus } from '@/stores';

const curYear = new Date().getFullYear();
const copyrightText = SidebarConfig.copyright.text.replace('{{date}}', `${curYear}`);

let ReportMsg
let HealthData
let MediaInfo
let latestmusic;
const isOnline = ref(false);
const ReportMessage = ref();

const appdesc = fetch(`https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main/app-desc.json`)
  .then((res) => res.json());
const getAppdesc = (AppName) => {
  try {
    return appdesc[AppName];
  } catch (error) {
    return;
  }
};

const fetchData = async () => {
  ReportMsg = await $fetch('/api/getReportMsg');
  HealthData = await $fetch('/api/getBodyinfo');
  if (ReportMsg.processName != null) {
    ReportStatus.set(true);
    const Appdesc = getAppdesc(ReportMsg.processName) || '';
    ReportMessage.value = `Master 正在使用 ${ReportMsg.processName} ${Appdesc}`;
    if (ReportMsg.mediaInfo) {
      if (latestmusic != ReportMsg.mediaInfo.title) {
        latestmusic = ReportMsg.mediaInfo.title;
        MediaInfo = await $fetch(`/api/getMediainfo?songName=${ReportMsg.mediaInfo.title}&artist=${ReportMsg.mediaInfo.artist}`);
      }
    }
  } else {
    ReportStatus.set(false);
  }
  isOnline.value = ReportStatus.get();
};

await fetchData();

onMounted(() => {
  fetchData();
  const intervalId = setInterval(fetchReportData, 5000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="my-drawer" class="drawer-button lg:hidden">
        <Icon name="solar:sidebar-code-bold" class="w-8 h-8 m-4" />
      </label>
      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <aside
        class="bg-gray-100 max-w-60 w-60 h-screen p-4 flex flex-col justify-between border-r border-gray-300 fixed top-0 left-0 z-50 dark:bg-gray-800 dark:border-gray-950 md:flex">
        <div>
          <div class="flex flex-col items-center">
            <div class="text-base font-bold mb-4 flex items-center">
              <div class="tooltip tooltip-right" :data-tip="ReportMessage" v-if="isOnline">
                <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" />
              </div>
              <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" v-if="!isOnline" />
              {{ SiteConfig.title }}
            </div>
            <div class="w-56 max-w-56">
              <ul class="menu text-base bg-base-200">
                <li v-for="(item, index) in SidebarConfig.sections" :key="index" class="mb-2">
                  <NuxtLink :to="item.path" :class="{ 'active': $route.path === item.path }"
                    class="mb-2 flex items-center">
                    <Icon :name="item.icon" class="w-6 h-6 mr-2" /> {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="ReportMsg.mediaInfo" class="card bg-base-200 flex flex-col justify-end">
          <div class="card-body items-center text-center">
            <h2 class="card-title">{{ ReportMsg.mediaInfo.title }}</h2>
            <p>艺术家: {{ ReportMsg.mediaInfo.artist }}</p>
            <img :src="MediaInfo.image" alt="专辑封面" class="w-24 h-24">
          </div>
        </div>
        <div v-if="HealthData" class="card bg-base-200 flex flex-col justify-end mt-4">
          <div class="card-body items-center text-center">
            <h2 class="card-title">健康信息</h2>
            <p>心率: {{ HealthData.xiaomiwatch_heartrate.state }} {{
              HealthData.xiaomiwatch_heartrate.attributes.unit_of_measurement }}</p>
            <p>血氧饱和度: {{ HealthData.xiaomiwatch_spo2.state }} {{
              HealthData.xiaomiwatch_spo2.attributes.unit_of_measurement }}</p>
            <p>压力: {{ HealthData.xiaomiwatch_stress.state }}</p>
          </div>
        </div>
        <div class="text-center mt-4 text-sm">
          <div class="divider mb-2"></div>
          {{ copyrightText }}
        </div>
      </aside>
    </div>
  </div>
</template>