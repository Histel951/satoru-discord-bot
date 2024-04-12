<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="login"
                      placeholder="Login"
                      autocomplete="Login"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <p v-if="error" class="text-danger">{{ error }}</p>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="singIn"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { authStore } from "../../store/authStore";
import { ref } from "vue";
import { CCol, CContainer, CRow } from "@coreui/vue/dist/esm/components/grid";
import { CCard, CCardBody, CCardGroup } from "@coreui/vue/dist/esm/components/card";
import { CForm, CFormInput, CInputGroup, CInputGroupText } from "@coreui/vue/dist/esm/components/form";
import { CButton } from "@coreui/vue/dist/esm/components/button";
import { useRouter, useRoute } from "vue-router";

export default {
  name: 'Login',
  components: {
    CButton,
    CFormInput, CInputGroupText, CInputGroup, CForm, CCardBody, CCard, CCardGroup, CCol, CRow, CContainer},
  setup() {
    const login = ref('')
    const password = ref('')
    const router = useRouter()
    const route = useRoute()

    const error = ref('')

    const singIn = async () => {
      try {
        await authStore.dispatch('login', {
          login: login.value,
          password: password.value,
        })

        error.value = ''

        await router.replace({ name: 'Home' })
      } catch (err) {
        if (err.response?.data) {
          const { error: errorMessage } = err.response?.data

          error.value = errorMessage
        }
      }
    }

    return {
      login,
      password,
      error,
      singIn,
      route
    }
  }
}
</script>
