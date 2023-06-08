<template>
  <div>
	<br>
	<p class="is-size-3 has-text-weight-bold">Customer: List</p>
	<router-link :to="{ path: 'customers/add' }" class="button is-success mt-5"
	  >Add New</router-link
	>
	<table class="table is-striped is-bordered mt-2 is-fullwidth">
	  <thead>
		<tr>
		  <th>KTP</th>
		  <th>Nama</th>
		  <th>Contact</th>
		  <th>Email</th>
		  <th>alamat</th>
		  <th>Tipe Diskon</th>
		  <th>Diskon</th>
		  <th class="has-text-centered">Actions</th>
		</tr>
	  </thead>
	  <tbody>
		<tr v-for="customer in customers" :key="customer.id">
		  <td>
			<img v-if="customer.ktp" :src="customer.ktp" style="width:100px;"/>
			<img v-else src="/fileicon.png" style="width:100px;"/>
		  </td>
		  <td>{{ customer.nama }}</td>
			<td>{{ customer.contact }}</td>
			<td>{{ customer.email }}</td>
			<td>{{ customer.alamat }}</td>
			<td>{{ customer.tipe_diskon }}</td>
			<td>{{ customer.diskon }}</td>
		  <td class="has-text-centered">
			<router-link
			  :to="{ path: 'customers/edit', name: 'EditCustomer', params: { id: customer.id } }"
			  class="button is-info is-small"
			  >Edit</router-link
			>
			<a
			  class="button is-danger is-small"
			  @click="deleteCustomer(customer.id)"
			  >Delete</a
			>
		  </td>
		</tr>
	  </tbody>
	</table>
  </div>
</template>
  
<script>
// import axios
import axios from "axios";
  
export default {
  name: "CustomerList",
  data() {
	return {
	  customers: [],
	};
  },
  
  created() {
	this.getCustomers();
  },
  
  methods: {
	// Get All Customers
	async getCustomers() {
	  try {
		const response = await axios.get("http://localhost:5000/customers");
		this.customers = response.data;
	  } catch (err) {
		console.log(err);
	  }
	},
  
	// Delete Customer
	async deleteCustomer(id) {
	  try {
		await axios.delete(`http://localhost:5000/customers/${id}`);
		alert("Berhasil Delete");
		this.getCustomers();
	  } catch (err) {
		console.log(err);
	  }
	},
  },
};
</script>
  
<style>
</style>