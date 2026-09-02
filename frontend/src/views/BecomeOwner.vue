<template>
  <div class="owner-wrapper">
    <div class="owner-header">
      <h1>Become a Product owner</h1>
      <p>Turn your unused items into a source of income</p>
    </div>

    <div class="safety-alert">
      <div class="safety-icon">🛡️</div>
      <div>
        <strong>Safety Evaluation Required</strong>
        <p>Before listing your products, they must undergo a safety evaluation.</p>
      </div>
    </div>

    <!-- Form for submitting product listings -->
     <form @submit.prevent="submitProduct" class="owner-form">
      <div class="form-group">
        <label for="title">Product Title *</label>
        <input v-model="form.title" placeholder="e.g., Jackhammer" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Category *</label>
          <select v-model="form.category" required>
            <option>Tools</option>
            <option>Trailers</option>
            <option>Gas Tanks</option>
            <option>Appliances</option>
            <option>Event Equipment</option>
            <option>Machinery</option>
          </select>
        </div>
        <div class="form-group">
          <label>Price per day (R) *</label>
          <input v-model="form.price" type="number" min="10" placeholder="150" required />
        </div>
      </div>
      
      <div class="form-group">
        <label>Location *</label>
        <input v-model="form.location" placeholder="Cape Town, Bellville ..." required />
      </div>

      <div class="form-group">
        <label>Condition and Safety Notes *</label>
        <textarea v-model="form.description" placeholder="Describe condition, last service date, and defects.." required></textarea>
      </div>

      <div class="form-group">
        <label>Product Photo *</label>
        <input type="file" @change="onFile" accept="image/*" required />
        <small style="color: #64748b">Required for safety evaluation</small>
      </div>

      <div class="commission-box">
        <h4>Earnings Preview (15% commission Model)</h4>
        <div class="commission-row"><span>Customer Pays:</span><span>R{{ form.price || 0 }}/day</span></div>
        <div class="commission-row"><span>Platform Fee (15%):</span><span>R{{ (form.price *0.15).toFixed(2) }}/day</span></div>
        <div class="commission-row total"><span>You Earn(85%):</span><span>R{{ (form.price * 0.85).toFixed(2) }}/day</span></div>
      </div>

      <button type="submit" class="btn-primary full-width" :disabled="loading">
        {{ loading? 'Submitting': 'Submit for Safety Evaluation' }}
      </button>
     </form>

     <div v-if="result" class="success-box">
      {{ result }} <br/>
      <strong>Status:</strong>Pending Inspection - Our team will verify within 24 hours.
     </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { reactive, ref } from 'vue';
import axios from 'axios';

const form = reactive({
  title: '',
  category: 'Tools',
  price: 150,
  location: '',
  description: '',
});
const image = ref(null);
const loading = ref(false);

const onFile = (e) => image.value = e.target.files[0];

const submitProduct = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (image.value) formData.append('image', image.value)
    const res = await axios.post('/api/owner/list-product', formData)
    Swal.fire({
      icon: 'success',
      title: 'Submitted!',
      text: res.data.message || 'Product submitted for safety evaluation',
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Submission failed',
      text: error.response?.data?.error || 'Submission failed. Please try again.',
      confirmButtonColor: '#f59e0b'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.owner-wrapper {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}
.owner-header h1 {
  font-size: 28px;
  font-weight: 700;
}
.owner-header p {
  color: var(--muted);
  margin-top: 8px;
}

.safety-alert {
  background: #fffbeb;
  border: 1px solid var(--yellow);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
.safety-icon {
  font-size: 24px;
  color: var(--yellow);
}

.owner-form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-group label {
  font-size: 14px;
  font-weight: 600;
}
.form-group input, .form-group select {
  height: 48px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
}
.form-group textarea {
  height: 100px;
  padding: 16px;
  resize: vertical;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
}
.commission-box {
  background: var(--light);
  border-radius: 12px;
  padding: 16px;
  border: 1px dashed var(--border);
}
.commission-row {
  display:flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
}
.commission-row .total {
  font-weight: 700;
  border-top: 1px solid var(--border);
  margin-top: 8px;
  padding-top: 8px;
}
.full-width {
  width: 100%;
}
.success-box {
  margin-top: 20px;
  background: #f0fdf4;
  border: 1px solid var(--green);
  border-radius: 12px;
  padding: 16px;
}
@media (max-width: 768px) {
  .owner-wrapper{
    margin: 20px;
    padding: 20px;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>