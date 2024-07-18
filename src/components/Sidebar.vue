<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Avatar from '@/components/Avatar.vue';
import { SidebarConfig, SiteConfig } from '@/config';
import { ReportStatus } from '@/stores';

const curYear = new Date().getFullYear();
const copyrightText = SidebarConfig.copyright.text.replace('{{date}}', `${curYear}`);

const ReportMsg = ref(null);
const HealthData = ref(null);
const MediaInfo = ref(null);
const latestmusic = ref('');
const isOnline = ref(false);
const ReportMessage = ref('');

let appdesc = null;

const fetchAppDesc = async () => {
  const response = await fetch(`https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main/app-desc.json`);
  appdesc = await response.json();
};

const getAppdesc = (AppName) => {
  try {
    return appdesc && appdesc[AppName] ? appdesc[AppName] : '';
  } catch (error) {
    return '';
  }
};

const fetchData = async () => {
  if (!appdesc) {
    await fetchAppDesc();
  }
  ReportMsg.value = await $fetch('/api/getReportMsg');
  HealthData.value = await $fetch('/api/getBodyinfo');
  if (ReportMsg.value.processName != null) {
    ReportStatus.set(true);
    const Appdesc = getAppdesc(ReportMsg.value.processName) || '';
    ReportMessage.value = `Master 正在使用 ${ReportMsg.value.processName} ${Appdesc}`;
    if (ReportMsg.value.mediaInfo) {
      if (latestmusic.value !== ReportMsg.value.mediaInfo.title) {
        latestmusic.value = ReportMsg.value.mediaInfo.title;
        MediaInfo.value = await $fetch(`/api/getMediainfo?songName=${ReportMsg.value.mediaInfo.title}&artist=${ReportMsg.value.mediaInfo.artist}`);
      }
    }
  } else {
    ReportStatus.set(false);
  }
  isOnline.value = ReportStatus.get();
};

onMounted(() => {
  fetchData();
  const intervalId = setInterval(fetchData, 5000);

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
              <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" v-else />
              {{ SiteConfig.title }}
            </div>
            <div class="w-full lg:w-56 max-w-56">
              <ul class="menu rounded-[1rem] text-base bg-base-200 w-full">
                <li v-for="(item, index) in SidebarConfig.sections" :key="index" class="mb-2">
                  <NuxtLink :to="item.path" :class="{ 'active': $route.path === item.path }"
                    class="mb-2 flex items-center w-full">
                    <Icon :name="item.icon" class="w-6 h-6 mr-2" /> {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="ReportMsg && ReportMsg.mediaInfo" class="card bg-base-200 flex flex-col justify-end mt-4 lg:mt-0">
          <div class="card-body items-center text-center p-4">
            <h2 class="card-title text-lg lg:text-xl">{{ MediaInfo?.name || ReportMsg.mediaInfo.title }}</h2>
            <p v-if="ReportMsg.mediaInfo.artist || MediaInfo?.artist" class="text-sm lg:text-base">艺术家: {{
              ReportMsg.mediaInfo.artist || MediaInfo?.artist }}</p>
            <div v-if="MediaInfo?.image" class="avatar mt-2">
              <div class="w-24 h-24 rounded-xl">
                <img :src="MediaInfo?.image" alt="专辑封面">
              </div>
            </div>
            <p v-if="MediaInfo?.tns" class="text-sm text-gray-700">{{ MediaInfo?.tns }}</p>
          </div>
        </div>
        <div v-if="HealthData" class="card bg-base-200 flex flex-col justify-end mt-4">
          <div class="card-body items-center text-center p-4">
            <h2 class="card-title text-lg lg:text-xl">健康信息</h2>
            <p class="text-sm lg:text-base">
              <Icon :name="HealthData.xiaomiwatch_heartrate.attributes?.icon" />心率: {{
                HealthData.xiaomiwatch_heartrate.state }} {{
                HealthData.xiaomiwatch_heartrate.attributes?.unit_of_measurement }}
            </p>
            <p class="text-sm lg:text-base">
              <Icon :name="HealthData.xiaomiwatch_spo2.attributes?.icon" />血氧饱和度: {{
                HealthData.xiaomiwatch_spo2.state }} {{
                HealthData.xiaomiwatch_spo2.attributes?.unit_of_measurement }}
            </p>
            <p class="text-sm lg:text-base">
              <Icon :name="HealthData.xiaomiwatch_stress.attributes?.icon" />压力: {{
                HealthData.xiaomiwatch_stress.state }}
            </p>
          </div>
        </div>
        <div class="text-center mt-4 text-sm lg:text-base">
          <div class="divider mb-2"></div>
          {{ copyrightText }}
        </div>
      </aside>
    </div>
  </div>
</template>
