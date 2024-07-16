<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Avatar from '@/components/Avatar.vue';
import { getReportMsg, getAppdesc } from '@/middleware/ReportService';
import { SidebarConfig, SiteConfig } from '@/config';
import { ReportStatus } from '@/stores';

const curYear = new Date().getFullYear();
const copyrightText = SidebarConfig.copyright.text.replace('{{date}}', `${curYear}`);

const isOnline = ref(false);
const ReportMessage = ref();

const fetchReportData = async () => {
  const ReportMsg = await getReportMsg();
  if (ReportMsg.processName != null) {
    ReportStatus.set(true);
    const Appdesc = (await getAppdesc(ReportMsg.processName)) || '';
    ReportMessage.value = `Master 正在使用 ${ReportMsg.processName} ${Appdesc}`;
  } else {
    ReportStatus.set(false);
  }
  isOnline.value = ReportStatus.get();
};

onMounted(() => {
  fetchReportData();
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
        class="bg-gray-100 w-60 h-screen p-4 flex flex-col justify-between border-r border-gray-300 fixed top-0 left-0 z-50 dark:bg-gray-800 dark:border-gray-950 md:flex">
        <div>
          <div class="flex flex-col items-center">
            <div class="text-base font-bold mb-4 flex items-center">
              <div class="tooltip tooltip-right" :data-tip="ReportMessage" v-if="isOnline">
                <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" />
              </div>
              <Avatar class="w-10 h-10 mr-2" :isOnline="isOnline" v-if="!isOnline" />
              {{ SiteConfig.title }}
            </div>
            <ul class="menu text-base bg-base-200 w-56">
              <li v-for="(item, index) in SidebarConfig.sections" :key="index" class="mb-2">
                <NuxtLink :to="item.path" :class="{ 'active': $route.path === item.path }"
                  class="mb-2 flex items-center">
                  <Icon :name="item.icon" class="w-6 h-6 mr-2" /> {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
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