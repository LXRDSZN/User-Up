<script setup>
import { ref } from 'vue'; 
import axios from 'axios'; 
import { useToast } from 'vue-toast-notification'; 
import 'vue-toast-notification/dist/theme-sugar.css'; 

// Variables reactivas para los archivos
const foto = ref(null);
const cv = ref(null);
const recibo = ref(null);

const toast = useToast();

// Función para manejar los cambios en los inputs
const handleFileChange = (event, tipo) => {
  const file = event.target.files[0];
  if (!file) return;

  if (tipo === 'foto') foto.value = file;
  if (tipo === 'cv') cv.value = file;
  if (tipo === 'recibo') recibo.value = file;
};

// Función para subir los archivos
const subirArchivos = async () => {
  // Validaciones de archivo
  if (!foto.value || !cv.value || !recibo.value) {
    toast.error('Por favor, sube todos los archivos requeridos.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('foto', foto.value);
    formData.append('cv', cv.value);
    formData.append('recibo', recibo.value);

    const response = await axios.post(
        'http://localhost:5000/api/auth/user-files',
        formData,
        { withCredentials: true }
        );

    if (response.status === 200 || response.status === 201) {
      toast.success('Archivos subidos exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();
    }
  } catch (error) {
    console.error('Error al subir archivos:', error);
    if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Error en los archivos enviados', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    } else {
      toast.error('Hubo un problema con el servidor. Intenta nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  }
};

// Limpiar los inputs
const limpiarFormulario = () => {
  foto.value = null;
  cv.value = null;
  recibo.value = null;

  document.getElementById('foto').value = '';
  document.getElementById('cv').value = '';
  document.getElementById('recibo').value = '';
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <div class="alta-usuario-container">
        <h1>Subir archivos del Usuario</h1>
        <form @submit.prevent="subirArchivos">

          <div class="form-group">
            <label for="foto">Foto (JPG):</label>
            <input type="file" id="foto" accept=".jpg,.jpeg" @change="e => handleFileChange(e, 'foto')" />
          </div>

          <div class="form-group">
            <label for="cv">CV (PDF):</label>
            <input type="file" id="cv" accept=".pdf" @change="e => handleFileChange(e, 'cv')" />
          </div>

          <div class="form-group">
            <label for="recibo">Recibo de luz (PNG):</label>
            <input type="file" id="recibo" accept=".png" @change="e => handleFileChange(e, 'recibo')" />
          </div>

          <button type="submit" class="btn-submit">Subir Archivos</button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.syste-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 1rem;
}

/* Panel de contenido */
.panel {
  display: flex;
  color: #000000;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%;
}

.alta-materia-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}

input[type="file"] {
  border: 1px dashed #aaa;
  cursor: pointer;
  transition: border-color 0.3s;
}

input[type="file"]:hover {
  border-color: #4caf50;
}

button {
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #45a049;
}

</style>