<script setup>
import ProfileAPI from '@/services/api/ProfileAPI';
import { ref } from 'vue';


const api = import.meta.env.VITE_API_URL; 
const user = ref()

const handleGetProfile = async () => {
    let data = await ProfileAPI.getProfile();
    if(data) user.value = data;

}


onMounted(() => {
    handleGetProfile();
})

</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="api + user?.avatar" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="api + user?.avatar" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold text-red-500">
              {{ user?.user_name }}
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle><router-link to="/account-settings">Tài khoản</router-link></VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon=" bx-lock-open"
                size="22"
              />
            </template>

            <VListItemTitle>Bảo mật</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link disabled="true">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link disabled="true">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-help-circle"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-out"
                size="22"
              />
            </template>

            <VListItemTitle>Đăng xuất</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
