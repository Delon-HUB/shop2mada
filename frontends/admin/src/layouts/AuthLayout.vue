<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex column flex-center">
        <div flat>
          <q-toolbar>
            <q-toolbar-title class="text-bold">
              <strong
                ><span class="text-primary">SHOP2</span><span style="color: red">MADA</span></strong
              >
              <br />
              <p class="text-center text-overline">Administrateur</p>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div>
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/vtks-caveirada');

.layout {
  background-color: #14452f;
  height: 100vh;
}
.page {
  width: 100vw;
  border-radius: 64px 64px 0px 0px;
}

.title {
  border-radius: 64px;
  font-family: 'vtks caveirada', sans-serif;
  background: white;
  -webkit-background-clip: text;
  font-style: italic;
}
</style>
