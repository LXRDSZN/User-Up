<script setup>
import navbar from '@/components/navbar.vue';
import ComponentDashboard from '@/components/Dashboard/Component-Dashboard.vue';
</script>
<template>
    <div class="System-Panel">
        <navbar/>
        <ComponentDashboard/>
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
  