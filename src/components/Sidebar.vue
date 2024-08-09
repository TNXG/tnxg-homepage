<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Avatar from '@/components/Avatar.vue';
import { SidebarConfig, SiteConfig } from '@/config';
import { ReportStatus } from '@/stores';
import HealthInfo from '@/components/HealthInfo.vue';
import MediaInfo from '@/components/MediaInfo.vue';

const curYear = new Date().getFullYear();
const copyrightText = SidebarConfig.copyright.text.replace('{{date}}', `${curYear}`);

const ReportMsg = ref(null);
const latestMusic = ref('');
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
  if (ReportMsg.value.processName != null) {
    ReportStatus.set(true);
    const Appdesc = getAppdesc(ReportMsg.value.processName) || '';
    ReportMessage.value = `Master 正在使用 ${ReportMsg.value.processName} ${Appdesc}`;
    if (ReportMsg.value.mediaInfo) {
      if (latestMusic.value !== ReportMsg.value.mediaInfo.title) {
        latestMusic.value = ReportMsg.value.mediaInfo.title;
      }
    }
  } else {
    ReportStatus.set(false);
  }
  isOnline.value = ReportStatus.get();
};

onMounted(() => {

  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setViewportHeight();
  fetchData();
  const intervalId = setInterval(fetchData, 5000);
  window.addEventListener('resize', setViewportHeight);

  onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('resize', setViewportHeight);
  });
});
</script>

<template>
  <div class="drawer lg:drawer-open drawer-auto-gutter">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="my-drawer" class="drawer-button lg:hidden">
        <Icon icon="solar:sidebar-code-bold" class="w-8 h-8 m-4" />
      </label>
      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <aside
        class="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-950 max-w-60 w-60 h-[calc(var(--vh,1vh)*100)] p-4 flex flex-col justify-between border-r fixed top-0 left-0 z-50 md:flex">
        <div>
          <div class="flex flex-col items-center">
            <div class="text-base font-bold mb-4 flex items-center">
              <button data-popover-target="popover-avatar" type="button" class="relative text-center">
                <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" />
              </button>
              <div data-popover id="popover-avatar" role="tooltip"
                class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                <div
                  class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                  <h3 class="font-semibold text-gray-900 dark:text-white">详细信息</h3>
                </div>
                <div class="px-3 py-2">
                  <div v-if="ReportMessage" class="card bg-base-200 flex flex-col justify-end mt-4 mb-4 lg:mt-0">
                    <div class="card-body items-center text-center p-4">
                      <p>{{ ReportMessage }}</p>
                    </div>
                  </div>
                  <MediaInfo :reportMsg="ReportMsg" :latestMusic="latestMusic" />
                  <HealthInfo />
                </div>
                <div data-popper-arrow></div>
              </div>
              {{ SiteConfig.title }}
            </div>
            <div class="w-full lg:w-56 max-w-56">
              <ul class="menu rounded-[1rem] text-base bg-base-300 w-full">
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
        <div class="text-center mt-4 text-sm lg:text-base">
          <div class="divider mb-2"></div>
          <p class="text-gray-700 dark:text-gray-300 mb-2">
            {{ copyrightText }}
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Designed by <a href="https://github.com/TNXG/tnxg-homepage" target="_blank"
              class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">tnxg-homepage</a>
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>