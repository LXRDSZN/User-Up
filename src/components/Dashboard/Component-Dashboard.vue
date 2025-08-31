<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

const archivos = ref({
  foto: null,
  cv: null,
  recibo: null
});

const obtenerArchivos = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/user-files', {
      withCredentials: true
    });

    // Asegurarnos de que las URLs sean absolutas
    archivos.value = {
      foto: response.data.foto?.startsWith('http') ? response.data.foto : `http://localhost:5000/${response.data.foto}`,
      cv: response.data.cv?.startsWith('http') ? response.data.cv : `http://localhost:5000/${response.data.cv}`,
      recibo: response.data.recibo?.startsWith('http') ? response.data.recibo : `http://localhost:5000/${response.data.recibo}`,
    };
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    toast.error('Error al obtener archivos.', { position: 'top-right', duration: 5000 });
  }
};

onMounted(() => {
  
  obtenerArchivos();
});
</script>


<template>
  <div class="syste-panel">
    <div class="panel">
      <h1>Mis Archivos</h1>
      
      <div v-if="!archivos.foto && !archivos.cv && !archivos.recibo">
        No has subido archivos todavía.
      </div>

      <div v-else class="archivos-container">
            <!-- Foto -->
            <div v-if="archivos.foto" class="archivo-item">
              <label>Foto:</label>
              <a :href="archivos.foto" target="_blank" rel="noopener noreferrer">Ver Foto</a>
            </div>

            <!-- CV -->
            <div v-if="archivos.cv" class="archivo-item">
              <label>CV:</label>
              <a :href="archivos.cv" target="_blank" rel="noopener noreferrer">Ver PDF</a>
            </div>

            <!-- Recibo -->
            <div v-if="archivos.recibo" class="archivo-item">
              <label>Recibo de luz:</label>
              <a :href="archivos.recibo" target="_blank" rel="noopener noreferrer">Ver Recibo</a>
            </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.syste-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.archivos-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.archivo-item label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.foto-usuario {
  max-width: 200px;
  border-radius: 8px;
  margin-top: 0.5rem;
}
</style>
