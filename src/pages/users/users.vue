<script setup>
import { ref } from "vue";

import UserAPI from "@/services/api/UserAPI";
import store from "@/store/store";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import MultiSelect from "primevue/multiselect";
import Paginator from "primevue/paginator";
import TieredMenu from "primevue/tieredmenu";

const users = ref();
const api = import.meta.env.VITE_API_URL;

const fetchAllUsers = async () => {
  store.dispatch("startLoading");
  let users_data = await UserAPI.getAllUser();
  if (users_data.length > 0) {
    users.value = users_data;
  }
  setTimeout(() => {
    store.dispatch("stopLoading");
  }, 500);
};

onMounted(() => {
  fetchAllUsers();
});

watch(users, (newValue, oldValue) => {
  console.log('Giá trị mới:', newValue);
  console.log('Giá trị cũ:', oldValue);
});

// import { Officer } from './interface/officer.interface';
// import { PageEvent } from './interface/PageEvent.interface';

class City {
  name = "";
  code = "";
}

const menu_item_table = ref();
const table_menu_option = ref([
  {
    label: "Refresh",
    icon: "pi pi-refresh",
    command: () => {
      console.log("refresh");
    },
  },
  {
    label: "Export",
    icon: "pi pi-upload",
  },
]);

const menu_table_item_toggle = (event) => {
  menu_item_table.value.toggle(event);
};

const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);

const selectedCities = ref([]);
const value = ref("");
const menuItems = ref([
  { label: "In", icon: "pi pi-print" },
  { label: "Nhập", icon: "pi pi-file-import" },
  { label: "Xuất", icon: "pi pi-file-export" },
]);

const firstItems = ref(0);
const rowsItems = ref(10);
const showMenu = ref(false);

const onPageChange = (event) => {
  firstItems.value = event.first;
  rowsItems.value = event.rows;
};

const toggleMenu = (event) => {
  showMenu.value.toggle(event);
};
</script>

<style scoped>
@import "./users.css";
</style>

<template>
  <div id="users-page" class="box-container w-full pl-2 pr-2">
    <div class="title flex justify-between font-medium items-center">
      <div class="title-left flex text-xl">
        <div class="icon">
          <i
            class="pi pi-fw pi-users"
            style="font-size: 1em; font-weight: 500"
          ></i>
        </div>
        <div class="text-value ml-1">Sinh viên</div>
      </div>

      <!-- <div class="title-right">
          <router-link to="/create-user" class="no-underline hover:no-underline button-add text-white bg-black pt-2 pb-2 pl-2 pr-2 rounded-md cursor-pointer">
            <i class="pi pi-plus"></i>
            <span>
              Thêm mới
            </span>
          </router-link>
        </div> -->
    </div>
    <div class="router w-full text-sm mb-2 mt-2">
      <div class="flex items-center">
        <span class="route-item">Trang chủ</span>
        <span class="dots ml-2 mr-2"></span>
        <span class="route-item">Sinh viên</span>
      </div>
    </div>

    <div class="content w-full mt-2">
      <div
        class="box-content bg-white rounded-md mt-4 pt-4 pb-4 pl-3 pr-3 w-full"
      >
        <div class="content-top w-full flex">
          <div class="filter-1 mb-2 sm:w-4/12 md:w-2/12">
            <MultiSelect
              v-model="selectedCities"
              :options="cities"
              optionLabel="name"
              placeholder="Select Cities"
              :maxSelectedLabels="3"
              class="w-full md:w-20rem h-full"
            />
          </div>

          <div class="search mb-2 sm:w-8/12 md:w-10/12 h-full">
            <div class="content-search md:pl-2 flex">
              <div class="p-input-icon-left w-11/12 flex items-center">
                <i class="pi pi-search mr-3 ml-2"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </div>
              <div
                @click="toggleMenu"
                aria-haspopup="true"
                aria-controls="overlay_tmenu"
                class="option w-1/12 flex justify-center items-center text-gray-400 cursor-pointer text-xl"
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>

                <TieredMenu
                  ref="showMenu"
                  id="overlay_tmenu"
                  :model="menuItems"
                  popup
                />
              </div>
            </div>
          </div>
        </div>

        <div class="content-table w-full">
          <DataTable :value="users" tableStyle="min-width: 60rem">
            <Column field="id" header="Mã" :sortable="true"></Column>
            <Column field="user_name" header="Tên" :sortable="true">

              <template #body="slotProps">
                <div class="flex items-center">
                  <div class="avatar avatar-common">
                    <img
                      :src="`${api+ slotProps.data.avatar}`"
                      :alt="api+ slotProps.data.image"
                      class="w-6rem border-round"
                    />
                  </div>
                  <div class="ml-2">
                    <div class="name">
                      {{ slotProps.data.user_name }}
                    </div>
                    <!-- <div class="school text-sm blur-md-word">
                      {{ slotProps.data?.address?.name }}
                    </div> -->
                  </div>
                </div>
              </template>
            </Column>
            <Column field="email" header="Email" :sortable="true">
              <template #body="slotProps">
                <!-- Kiểm tra giá trị của trường "role" và hiển thị nội dung tương ứng -->
                {{ slotProps.data?.email }}
              </template>
            </Column>
            <Column
              field="school"
              header="Trường học"
              :sortable="true"
            >
            <template #body="slotProps">
                <!-- Kiểm tra giá trị của trường "role" và hiển thị nội dung tương ứng -->
                {{ slotProps.data?.school?.name }}
              </template>
          </Column>
            <Column
              field="createdAt"
              header="Thời gian"
              :sortable="true"
            ></Column>
            <Column field="role" header="Quyền" :sortable="true">
              <template #body="slotProps">
                <!-- Kiểm tra giá trị của trường "role" và hiển thị nội dung tương ứng -->
                {{ slotProps.data.role === 1 ? 'Quản trị' : 'Người dùng' }}
              </template>
            </Column>
            <Column header="">
              <template #body="slotProps">
                <div
                  class="action-item text-gray-400 cursor-pointer"
                  @click="menu_table_item_toggle"
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </template>
            </Column>
          </DataTable>

          <div class="mt-3 flex justify-center paginator bg-white">
            <Paginator
              :rows="10"
              :totalRecords="120"
              :rowsPerPageOptions="[10, 20, 30]"
            ></Paginator>
          </div>
        </div>
      </div>
    </div>
    <TieredMenu
      ref="menu_item_table"
      id="overlay_menu"
      :model="table_menu_option"
      :popup="true"
    />
  </div>
</template>
