


<script setup>
import AddressAPI from '@/services/api/AddressAPI';
import SchoolAPI from '@/services/api/SchoolAPI';
import store from '@/store/store';
import Avatar from 'primevue/avatar';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import Paginator from 'primevue/paginator';
import TieredMenu from 'primevue/tieredmenu';
import { onMounted, ref } from 'vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";




const api = import.meta.env.VITE_API_URL;
const confirm = useConfirm();
const toast = useToast();
const visibleCreate = ref(false);
const newSchoolCreate = ref();
const menu_table_action = ref();
const itemTableselectedId = ref(null);
const members_list = ref([]);
const schools = ref();
const visiableDialogUser = ref(false);

const confirmDelete = () => {
  confirm.require({
        message: 'Bạn chắc chắn muốn xóa?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        acceptIcon: 'pi pi-trash',
        rejectIcon: 'pi pi-check',
        rejectLabel: 'Không',
        acceptLabel: 'Xóa',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger bg-red-500 text-white',
        
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

// import { Officer } from './interface/officer.interface';
// import { PageEvent } from './interface/PageEvent.interface';




const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const selectedCities = ref([]);
const value = ref('');
const menuItems = ref([
  { label: 'In', icon: 'pi pi-print' },
  { label: 'Nhập', icon: 'pi pi-file-import' },
  { label: 'Xuất', icon: 'pi pi-file-export' }
]);

const selectedAddress = ref();
const dropdownAddress = ref([
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


const handleFetchSchoolData = async () => {
    store.dispatch('startLoading');
    let result = await SchoolAPI.getAll();
    setTimeout(() => {
      store.dispatch('stopLoading');
    }, 500);

    if(result.length > 0){
        schools.value = result;
    }

}

const handleFetchAddressData = async () => {
    store.dispatch('startLoading');
    let result = await AddressAPI.getAll();
    setTimeout(() => {
      store.dispatch('stopLoading');
    }, 500);

    if(result.length > 0){
        dropdownAddress.value = result;
        
    }

}

onMounted(() => {
  handleFetchSchoolData();
  handleFetchAddressData();
})




const onClick = (event, id) => {
  itemTableselectedId.value = id;
    menu_table_action.value.show(event);
};

const handleAcceptSchool= async() => {
    let result = await SchoolAPI.acceptSchool(itemTableselectedId.value);
    if(result >= 200 || result < 300) {
      toast.add({ severity: 'success', summary: 'Thông báo', detail: 'Thành công', life: 3000 });
      handleFetchSchoolData();
    }
    else toast.add({ severity: 'error', summary: 'Thông báo', detail: 'Thất bại', life: 3000 });
}

const itemMenuAction = ref([
    {
        label: 'Xác nhận',
        icon: 'pi pi-check',
        shortcut: '⌘+A',
        class: 'menu-confirm',
        command: () => {
          handleAcceptSchool();
        }
    },
    {
        label: 'Xóa',
        icon: 'pi pi-trash',
        shortcut: '⌘+Z',
        class: 'menu-delete',
        command: () => {
          confirmDelete();
        }
    },
    {
        label: 'Xem thành viên',
        icon: 'pi pi-eye',
        shortcut: '⌘+Z',
        class: 'menu-view',
        command: () => {
          // console.log(itemTableselectedId);
          // console.log(conversations.value);
          members_list.value = schools.value.filter(school => school.id == itemTableselectedId.value)
          console.log(members_list.value);
          visiableDialogUser.value = true;
        }
    },
    {
        label: 'Danh sách khoa',
        icon: 'pi pi-book',
        shortcut: '⌘+Z',
        class: 'menu-view-2',
        command: () => {
          // console.log(itemTableselectedId);
          // console.log(conversations.value);
          members_list.value = schools.value.filter(school => school.id == itemTableselectedId.value)
          console.log(members_list.value);
          visiableDialogUser.value = true;
        }
    },
    {
        separator: true
    }
]);



const handleSaveNewSchool = async () => {
    console.log(newSchoolCreate.value);
    console.log(selectedAddress.value);

    if(!selectedAddress.value || newSchoolCreate.value.id) return toast.add({ severity: 'error',summary: 'Thông báo', detail: 'Vui lòng nhập đầy đủ dữ liệu', life: 3000 });
    visibleCreate.value = false;

    let dataSave = {
      name: newSchoolCreate.value,
      address_id: selectedAddress.value.id
    }
    console.log(dataSave);
    let result = await SchoolAPI.create(dataSave);
    if(result >= 200 && result < 300) {
      handleFetchSchoolData();
      return toast.add({ severity: 'success',summary: 'Thông báo', detail: 'Thêm thành công', life: 3000 });
    }

    toast.add({ severity: 'error',summary: 'Thông báo', detail: 'Thêm thất bại', life: 3000 });
    
}

</script>


<style scoped>
  @import './schools.css';
</style>

<template>
    <div id="schools-page" class="box-container w-full pl-2 pr-2">
      <div class="title flex justify-between font-medium items-center">
        <div class="title-left flex text-xl">
          <div class="icon">
            <i class="pi pi-fw pi-users" style="font-size: 1em; font-weight: 500;"></i>
          </div>
          <div class="text-value ml-1">
            Sinh viên
          </div>
        </div>
  
        <div class="title-right">
          <div @click="visibleCreate = true" class="no-underline hover:no-underline button-add text-white bg-black pt-2 pb-2 pl-2 pr-2 rounded-md cursor-pointer">
            <i class="pi pi-plus"></i>
            <span>
              Thêm mới
            </span>
          </div>
        </div>
      </div>
      <div class="router w-full text-sm mb-2 mt-2">
        <div class="flex items-center">
          <span class="route-item">Trang chủ</span>
          <span class="dots ml-2 mr-2"></span>
          <span class="route-item">Bài viết</span>
        </div>
      </div>
     
      <div class="content w-full mt-2">
        <div class="box-content bg-white rounded-md mt-4 pt-4 pb-4 pl-3 pr-3 w-full">
          <div class="content-top w-full flex">
            <div class="filter-1  mb-2 sm:w-4/12 md:w-2/12">
                <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Select Cities"
            :maxSelectedLabels="3" class="w-full md:w-20rem h-full" />
              
            </div>
  
            <div class="search mb-2 sm:w-8/12 md:w-10/12 h-full">
              <div class="content-search md:pl-2 flex">
                <div class="p-input-icon-left w-11/12 flex items-center">
                  <i class="pi pi-search mr-3 ml-2"></i>
                  <input type="text" placeholder="Tìm kiếm...">
                </div>
                <div  @click="toggleMenu" aria-haspopup="true" aria-controls="overlay_tmenu"  class="option w-1/12 flex justify-center items-center text-gray-400 cursor-pointer text-xl">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                  
                  <TieredMenu ref="showMenu" id="overlay_tmenu" :model="menuItems" popup />
                </div>
              </div>
            </div>
          </div>
         
          <div class="content-table w-full">
            <DataTable :value="schools" tableStyle="min-width: 60rem" >
              <Column field="id" header="Mã" :sortable="true"></Column>
              <Column field="name" header="Tên" :sortable="true"></Column>
              <Column field="address.name" header="Tỉnh" :sortable="true">
                  <template #body="slotProps">
                      <div>
                        {{slotProps.data.address.name}}
                      </div>
                  </template>
              </Column>
              <Column field="userCount" header="Thành viên" :sortable="true"></Column>
              <Column field="conversationCount" header="Hội nhóm" :sortable="true"></Column>
              <Column field="status" header="Trạng thái" :sortable="true">
                <template #body= "slotProps">
                  <div v-if="slotProps.data?.status == 'pending'">
                    <span class="status-pending btn-yellow-main">Pending</span>
                  </div>
                  <div v-else>
                    <!-- Nội dung hiển thị khi status không phải là 'pending' -->
                    <span class="status-accept btn-green-main">Accept</span>
                  </div>
                </template>
              </Column>
              <Column field="createdAt" header="Thời gian" :sortable="true"></Column>
              <Column field="id" header="">
               <template #body=" slotProps">
                <div  @click="onClick($event, slotProps.data.id)" class="action-table w-full cursor-pointer text-center">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
               </div>
               </template>
              </Column>
            </DataTable>

            <div class=" mt-3 flex justify-center paginator bg-white">
              
              <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ContextMenu class="text-sm menu-style-main " ref="menu_table_action" :model="itemMenuAction">
            <template #item="{ item, props }">
                <a v-ripple class="flex align-items-center mt-2 text-sm" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="item.items" class="pi pi-angle-right ml-auto"></i>
                </a>
            </template>
        </ContextMenu>

        <Dialog v-model:visible="visiableDialogUser" modal header="Danh sách thành viên" :style="{ width: '25rem' }">
          <!-- <span class="p-text-secondary block mb-5">Danh sách thành viên</span> -->
          <div class="content-menbers-list">
            
            <div v-for="item in members_list[0].users">
                <div class="item-user flex items-center mt-2">
                    <div class="w-11/12 flex items-center">
                      <div class="avatar ">
                      <Avatar :image="api + item?.avatar" shape="circle" />
                    </div>
                    <div class="user-name ml-1 blur-word text-sm ">
                        {{ item.user_name }}
                    </div>
                    </div>
                    <div class="view-profile w-1/12 green-color cursor-pointer">
                      <i class="fa-regular fa-eye"></i>
                    </div>
                </div>
            </div>
          </div>
          
          
      </Dialog>

      <Dialog v-model:visible="visibleCreate" modal header="Thêm trường học mới" :style="{ width: '25rem' }">
        
            <div class="flex align-items-center gap-3 mb-3 mt-3">
              <v-text-field v-model="newSchoolCreate" label="Tên trường" variant="outlined"></v-text-field>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
              <Dropdown v-model="selectedAddress" :options="dropdownAddress" optionLabel="name" placeholder="Tỉnh thành" class="w-full md:w-[14rem] pt-2 pb-2" />
            </div>
            
            <div class="flex justify-end gap-2">
                <Button type="button" label="Hủy" size="small" severity="secondary" @click="visibleCreate = false"></Button>
                <Button type="button" label="Lưu lại" size="small" @click="handleSaveNewSchool()"></Button>
                
            </div>
        </Dialog>
  </template>
  