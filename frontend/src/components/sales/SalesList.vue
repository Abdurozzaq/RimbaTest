<template>
  <div>
	<br>
	<p class="is-size-3 has-text-weight-bold">Sales: List</p>
	<router-link :to="{ path: 'sales/add' }" class="button is-success mt-5"
	  >Add New</router-link
	>
	<table class="table is-striped is-bordered mt-2 is-fullwidth">
	  <thead>
		<tr>
		  <th>Code Transaksi</th>
		  <th>Tanggal Transaksi</th>
		  <th>Total Diskon</th>
		  <th>Tipe Diskon</th>
		  <th>Total Harga</th>
		  <th>Total Bayar</th>
		  <th>Nama Customer</th>
		  <th>Email Customer</th>
		  <th class="has-text-centered">Actions</th>
		</tr>
	  </thead>
	  <tbody>
		<tr v-for="sale in sales" :key="sale.id">
		  <td>{{ sale.code_transaksi }}</td>
			<td>{{ sale.tanggal_transaksi }}</td>
			<td>{{ sale.total_diskon }}</td>
			<td>{{ sale.tipe_diskon }}</td>
			<td>{{ sale.total_harga }}</td>
			<td>{{ sale.total_bayar }}</td>
			<td>{{ sale.nama }}</td>
			<td>{{ sale.email }}</td>
		  <td class="has-text-centered">
			<router-link
			  :to="{ path: 'sales/detail', name: 'DetailSales', params: { id: sale.id } }"
			  class="button is-info is-small"
			  >Lihat Detail</router-link
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
  name: "SalesList",
  data() {
	return {
	  sales: [],
	};
  },
  
  created() {
	this.getSales();
  },
  
  methods: {
	// Get All Sales
	async getSales() {
	  try {
		const response = await axios.get("http://localhost:5000/sales");
		this.sales = response.data;
	  } catch (err) {
		console.log(err);
	  }
	},
  },
};
</script>
  
<style>
</style>