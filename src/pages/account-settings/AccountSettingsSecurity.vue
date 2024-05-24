<script setup>

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('12345678')
const newPassword = ref('87654321')
const confirmPassword = ref('87654321')

const passwordRequirements = [
  'Ít nhất 4 kí tự',
  'Có chữ hoa, chữ thường, chữ số, kí tự đặt biệt',
]

// const serverKeys = [
//   {
//     name: 'Server Key 1',
//     key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
//     createdOn: '28 Apr 2021, 18:20 GTM+4:10',
//     permission: 'Full Access',
//   },
//   {
//     name: 'Server Key 2',
//     key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
//     createdOn: '12 Feb 2021, 10:30 GTM+2:30',
//     permission: 'Read Only',
//   },
//   {
//     name: 'Server Key 3',
//     key: '2e915e59-3105-47f2-8838-6e46bf83b711',
//     createdOn: '28 Dec 2020, 12:21 GTM+4:10',
//     permission: 'Full Access',
//   },
// ]

// const recentDevicesHeaders = [
//   {
//     title: 'BROWSER',
//     key: 'browser',
//   },
//   {
//     title: 'DEVICE',
//     key: 'device',
//   },
//   {
//     title: 'LOCATION',
//     key: 'location',
//   },
//   {
//     title: 'RECENT ACTIVITY',
//     key: 'recentActivity',
//   },
// ]

// const recentDevices = [
//   {
//     browser: 'Chrome on Windows',
//     device: 'HP Spectre 360',
//     location: 'New York, NY',
//     recentActivity: '28 Apr 2022, 18:20',
//     deviceIcon: {
//       icon: 'bxl-windows',
//       color: 'primary',
//     },
//   },
//   {
//     browser: 'Chrome on iPhone',
//     device: 'iPhone 12x',
//     location: 'Los Angeles, CA',
//     recentActivity: '20 Apr 2022, 10:20',
//     deviceIcon: {
//       icon: 'bx-mobile',
//       color: 'error',
//     },
//   },
//   {
//     browser: 'Chrome on Android',
//     device: 'Oneplus 9 Pro',
//     location: 'San Francisco, CA',
//     recentActivity: '16 Apr 2022, 04:20',
//     deviceIcon: {
//       icon: 'bxl-android',
//       color: 'success',
//     },
//   },
//   {
//     browser: 'Chrome on MacOS',
//     device: 'Apple iMac',
//     location: 'New York, NY',
//     recentActivity: '28 Apr 2022, 18:20',
//     deviceIcon: {
//       icon: 'bxl-apple',
//       color: 'secondary',
//     },
//   },
//   {
//     browser: 'Chrome on Windows',
//     device: 'HP Spectre 360',
//     location: 'Los Angeles, CA',
//     recentActivity: '20 Apr 2022, 10:20',
//     deviceIcon: {
//       icon: 'bxl-windows',
//       color: 'primary',
//     },
//   },
//   {
//     browser: 'Chrome on Android',
//     device: 'Oneplus 9 Pro',
//     location: 'San Francisco, CA',
//     recentActivity: '16 Apr 2022, 04:20',
//     deviceIcon: {
//       icon: 'bxl-android',
//       color: 'success',
//     },
//   },
// ]
</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Thay đổi mật khẩu">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Mật khẩu hiện tại"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Mật khẩu mới"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Nhập lại mật khẩu mới"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Yêu cầu mật khẩu:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="bxs-circle"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Lưu thay đổi</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Làm lại
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

  </VRow>
</template>
