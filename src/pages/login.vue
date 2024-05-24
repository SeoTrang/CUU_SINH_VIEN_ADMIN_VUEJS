<script setup>
import AuthAPI from "@/services/api/AuthAPI";
import store from "@/store/store";
import logo from "@images/logo.svg?raw";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthProvider from "./authentication/AuthProvider.vue";
const toast = useToast();

const router = useRouter();
const route = useRoute();

const form = ref({
  email: "seotrangbh24@gmail.com",
  password: "trang789",
});

const isPasswordVisible = ref(false);

const login = async () => {
  console.log("hello");
  let result = await AuthAPI.login(form.value.email, form.value.password);
  console.log(result);
  setTimeout(() => {
    store.dispatch("stopLoading");
  }, 500);
  if (result == 200) {
    toast.add({
      severity: "success",
      summary: "Thông báo ⚠️",
      detail: "Đăng nhập thành công",
      life: 3000,
    });
    return router.push("/dashboard");
  } 
  if(result == 403){
    return toast.add({
      severity: "error",
      summary: "Thông báo ⚠️",
      detail: "Tài khoản không có quyền truy cập",
      life: 3000,
    });
  }

    toast.add({
      severity: "error",
      summary: "Thông báo ⚠️",
      detail: "Tài khoản hoặc mật khẩu không hợp lệ",
      life: 3000,
    });
  
};

const handleLogin = () => {
  console.log(form.value.email);
  console.log(form.value.password);
  store.dispatch("startLoading");
  login();

  // router.push('/')
};

const visible = ref(false);
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary" v-html="logo" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1 text-center">Cựu sinh viên! 👋🏻</h5>
        <p class="mb-0 text-center">Nhập email và mật khẩu để đăng nhập</p>
      </VCardText>

      <VCardText>
        <div>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Mật khẩu"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <!-- <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div> -->

              <!-- login button -->
              <VBtn block class="mt-4" @click="handleLogin()"> Đăng nhập </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>Bạn quên mật khẩu?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Lấy lại mật khẩu
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
