<template>
  <div class="syste-panel">
    <div class="panel">
      <h1>Archivos de Usuarios</h1>

      <!-- Mostrar mensaje si no hay datos o si el usuario no es admin -->
      <div v-if="userRole !== 'admin' || users === []">
        {{ userRole !== 'admin' ? 'No tienes permisos para ver esta información' : 'No hay archivos disponibles para usuarios con rol "user"' }}
        <p>{{users.data}}</p>
      </div>
      
      <!-- Tabla con datos -->
      <div v-else class="table-container">
        <table class="user-files-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Foto</th>
              <th>CV</th>
              <th>Recibo</th>
							<th>Es Mayor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.userId">
							<td>{{ user.fullname }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.email}}</td>
              <td>
                <a v-if="user.foto" :href="user.foto" target="_blank" rel="noopener noreferrer">Ver Foto</a>
                <span v-else>No disponible</span>
              </td>
              <td>
                <a v-if="user.cv" :href="user.cv" target="_blank" rel="noopener noreferrer">Ver PDF</a>
                <span v-else>No disponible</span>
              </td>
              <td>
                <a v-if="user.recibo" :href="user.recibo" target="_blank" rel="noopener noreferrer">Ver Recibo</a>
                <span v-else>No disponible</span>
              </td>
							<td :class=" user.age > 17  ? 'green' : 'red'">
								{{ user.age > 17 ? 'Es mayor de Edad' : 'Es menor de Edad' }}
							</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


    const userRole = ref('guest');
    const users = ref([]);


    onMounted(async () => {
      try {
        // Obtener el rol del usuario desde la cookie
        const roleResponse = await axios.get('http://localhost:5000/api/auth/get-role',{
            withCredentials: true
        });
        
        userRole.value = roleResponse.data.role;

        // Si el usuario es admin, obtener los datos de los usuarios con rol 'user'
        if (userRole.value === 'admin') {
          const usersResponse = await axios.get('http://localhost:5000/api/auth/users-data',{
            withCredentials: true
        });
          
          users.value = usersResponse.data.data;
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    });

</script>

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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.table-container {
  overflow-x: auto;
}

.user-files-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-files-table th,
.user-files-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-files-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.user-files-table a {
  color: #007bff;
  text-decoration: none;
}

.user-files-table a:hover {
  text-decoration: underline;
}

.user-files-table span {
  color: #888;
}

.green {
	color: #009414ff;
}

.red {
	color: #ac0505ff;
}
</style>
