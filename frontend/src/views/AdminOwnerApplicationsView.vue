<template>
  <section class="admin-page">
    <h1>Owner Applications</h1>

    <div class="tabs">
      <button
        v-for="tab in ['pending', 'approved', 'rejected']"
        :key="tab"
        :class="{ active: statusFilter === tab }"
        @click="loadApplications(tab)"
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <p v-if="loading">Loading applications...</p>
    <p v-else-if="applications.length === 0">No {{ statusFilter }} applications.</p>

    <table v-else class="app-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Submitted</th>
          <th v-if="statusFilter === 'pending'">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="app in applications" :key="app.id">
          <td>{{ app.full_name }}</td>
          <td>{{ app.email }}</td>
          <td>{{ app.phone }}</td>
          <td>{{ app.city }}, {{ app.province }}</td>
          <td>{{ new Date(app.created_at).toLocaleDateString() }}</td>
          <td v-if="statusFilter === 'pending'" class="actions">
            <button class="approve" @click="decide(app.id, 'approve')">Approve</button>
            <button class="reject" @click="decide(app.id, 'reject')">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ownerApplicationApi } from "../services/api";
import { showToast } from "../utils/notifications";

const applications = ref([]);
const statusFilter = ref("pending");
const loading = ref(false);

async function loadApplications(status) {
  statusFilter.value = status;
  loading.value = true;
  try {
    const data = await ownerApplicationApi.listAll(status);
    applications.value = data.applications || [];
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    loading.value = false;
  }
}

async function decide(id, action) {
  try {
    if (action === "approve") {
      await ownerApplicationApi.approve(id);
      showToast("Application approved.", "success");
    } else {
      await ownerApplicationApi.reject(id);
      showToast("Application rejected.", "success");
    }
    await loadApplications(statusFilter.value);
  } catch (error) {
    showToast(error.message, "error");
  }
}

onMounted(() => loadApplications("pending"));
</script>

<style scoped>
.admin-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  color: #111827;
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 20px 0;
}

.tabs button {
  padding: 8px 16px;
  border: 1px solid #e6e2da;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

.tabs button.active {
  background: #0b3b32;
  color: white;
  border-color: #0b3b32;
}

.app-table {
  width: 100%;
  border-collapse: collapse;
}

.app-table th,
.app-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #e6e2da;
  font-size: 0.88rem;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
}

.approve {
  background: #0b3b32;
  color: white;
}

.reject {
  background: #fde8e8;
  color: #b91c1c;
}
</style>