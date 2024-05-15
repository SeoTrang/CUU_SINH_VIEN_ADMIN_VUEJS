<script setup>
import { hexToRgb } from '@layouts/utils';
import { computed } from "vue";
import { useTheme } from 'vuetify';
// import { useStore } from 'vuex';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Loading from './components/loading/Loading.vue';
import store from './store/store';
// const store = useStore()
const { global } = useTheme()
const loading = computed(() => store.state.loading);

</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <Loading v-if="loading"/>
    <Toast position="top-center" />
    <ConfirmDialog></ConfirmDialog>
    <!-- <UpgradeToPro /> -->
  </VApp>
  
</template>
