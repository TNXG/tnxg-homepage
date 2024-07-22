<template>
    <div v-if="healthData" class="card bg-base-200 flex flex-col justify-end mt-4">
        <div class="card-body items-center text-center p-4">
            <h2 class="card-title text-lg lg:text-xl">健康信息</h2>
            <p class="text-sm lg:text-base">
                <Icon :name="healthData.xiaomiwatch_heartrate.attributes?.icon" />心率: {{
                    healthData.xiaomiwatch_heartrate.state }} {{
                    healthData.xiaomiwatch_heartrate.attributes?.unit_of_measurement }}
            </p>
            <p class="text-sm lg:text-base">
                <Icon :name="healthData.xiaomiwatch_spo2.attributes?.icon" />血氧饱和度: {{ healthData.xiaomiwatch_spo2.state
                }} {{ healthData.xiaomiwatch_spo2.attributes?.unit_of_measurement }}
            </p>
            <p class="text-sm lg:text-base">
                <Icon :name="healthData.xiaomiwatch_stress.attributes?.icon" />压力: {{
                    healthData.xiaomiwatch_stress.state }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const healthData = ref(null);

const fetchHealthData = async () => {
    healthData.value = await $fetch('/api/getBodyinfo');
};

onMounted(fetchHealthData);
</script>