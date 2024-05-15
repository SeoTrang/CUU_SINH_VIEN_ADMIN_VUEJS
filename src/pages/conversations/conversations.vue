


<script setup>
import ConversationAPI from '@/services/api/ConversationAPI';
import store from '@/store/store';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup'; //Optional for grouping
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



const confirm = useConfirm();
const toast = useToast();

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


const api = import.meta.env.VITE_API_URL;
// import { Officer } from './interface/officer.interface';
// import { PageEvent } from './interface/PageEvent.interface';
const conversations = ref();
const visiableDialogUser = ref(false);

const handleFetchConversationsData = async () => {
  store.dispatch('startLoading')
  let data = await ConversationAPI.getAll();
  console.log(data);
  setTimeout(() => {
      store.dispatch('stopLoading')
  }, 500);
  if(data) return conversations.value = data;
}

onMounted(() => {
  handleFetchConversationsData();
})

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

const firstItems = ref(0);
const rowsItems = ref(10);
const showMenu = ref(false);


const toggleMenu = (event) => {
  showMenu.value.toggle(event);
};

const menu_table_action = ref();
const itemTableselectedId = ref(null);
const members_list = ref([]);
const onClick = (event, id) => {
  itemTableselectedId.value = id;
    menu_table_action.value.show(event);
};

const handleAcceptConversation = async() => {
    let result = await ConversationAPI.acceptConversation(itemTableselectedId.value);
    if(result >= 200 || result < 300) {
      toast.add({ severity: 'success', summary: 'Thông báo', detail: 'Thành công', life: 3000 });
      handleFetchConversationsData();
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
          handleAcceptConversation();
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
          members_list.value = conversations.value.filter(conversation => conversation.id == itemTableselectedId.value)
          console.log(members_list.value);
          visiableDialogUser.value = true;
        }
    },
    {
        separator: true
    }
]);
</script>


<style scoped>
  @import './conversations.css';
</style>

<template>
    <div id="conversations-page" class=" box-container w-full pl-2 pr-2">
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
          <router-link to="/manager/admin/create-student" class="no-underline hover:no-underline button-add text-white bg-black pt-2 pb-2 pl-2 pr-2 rounded-md cursor-pointer">
            <i class="pi pi-plus"></i>
            <span>
              Thêm mới
            </span>
          </router-link>
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
            <DataTable :value="conversations" tableStyle="min-width: 80rem" >
              <Column field="id" header="Mã" :sortable="true"></Column>
              <Column field="name" header="Tên" :sortable="true">
                <template #body="slotProps">
                  <div class="flex items-center">
                    <AvatarGroup>
                        <Avatar v-for="item in slotProps.data.users" :image="api + item?.avatar" shape="circle" />
                        <Avatar v-if="slotProps.data.users.length - 3 > 0" :label="'+'+(slotProps.data.users.length - 3)" shape="circle" />
                    </AvatarGroup>

                  <div class="ml-2">
                    <div v-if="slotProps.data?.type == 'room'" class="name">
                      {{ slotProps.data?.name }}
                    </div>
                    <div v-else class="name">
                        <div v-for="item in slotProps.data.users">
                            {{ item?.user_name }},
                        </div>
                    </div>
                    <!-- <div class="school text-sm blur-md-word">
                      {{ slotProps.data.department.name }}
                    </div> -->
                  </div>
                  </div>
                </template>
              </Column>
              <Column field="messageCount" header="Tin nhắn" :sortable="true"></Column>
              <Column field="menberCount" header="Thành viên">
                  <template #body="slotProps" >
                      <div>
                        {{ slotProps.data.users.length }}
                      </div>
                  </template>
              </Column>
              <Column field="status" header="Trạng thái" :sortable="true">
              <template #body= "slotProps">
                  <div v-if="slotProps.data.status == 'pending'">
                    <span class="status-pending btn-yellow-main">Pending</span>
                  </div>
                  <div v-else>
                    <!-- Nội dung hiển thị khi status không phải là 'pending' -->
                    <span class="status-accept btn-green-main">Accept</span>
                  </div>
              </template> 
              </Column>
              <Column field="address" header="Tỉnh" :sortable="true">
              <template #body= "slotProps">
                  <div >
                    {{ slotProps.data?.address?.name }}
                  </div>
                  
              </template> 
              </Column>
              <Column field="school" header="Trường" :sortable="true">
              <template #body= "slotProps">
                  <div >
                    {{ slotProps.data?.school?.name }}
                  </div>
                  
              </template> 
              </Column>
              <Column field="faculty" header="Khoa" :sortable="true">
              <template #body= "slotProps">
                  <div >
                    {{ slotProps.data?.faculty?.name }}
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
    <ContextMenu class="text-sm menu-style-main" ref="menu_table_action" :model="itemMenuAction">
            <template #item="{ item, props }">
                <a v-ripple class="flex align-items-center " v-bind="props.action">
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
          <div class="flex justify-content-end gap-2">
              <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
              <Button type="button" label="Save" @click="visible = false"></Button>
          </div>
      </Dialog>
  </template>
  