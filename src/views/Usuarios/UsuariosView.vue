<script setup>
import navbar from '@/components/navbar.vue';
import ComponentUsuarios from '@/components/Usuarios/component-Usuario.vue';
</script>
<template>
    <div class="System-Panel">
        <navbar/>
        <ComponentUsuarios/>
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  