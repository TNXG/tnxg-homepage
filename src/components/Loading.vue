<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="card shadow-lg p-6 bg-white">
            <div class="flex flex-col items-center">
                <span class="loading loading-ring loading-lg text-info"></span>
                <p class="mt-4 text-lg font-medium text-gray-700 flex items-center">
                    Loading
                    <span class="animate-ping mx-1">.</span>
                    <span class="animate-ping mx-1" style="animation-delay: 0.2s;">.</span>
                    <span class="animate-ping mx-1" style="animation-delay: 0.4s;">.</span>
                </p>
            </div>
        </div>
    </div>
</template>