<template>
  <div>
	<br>
	<p class="is-size-3 has-text-weight-bold">Item: List</p>
	<router-link :to="{ path: 'items/add' }" class="button is-success mt-5"
	  >Add New</router-link
	>
	<table class="table is-striped is-bordered mt-2 is-fullwidth">
	  <thead>
		<tr>
		  <th>Gambar</th>
		  <th>Nama Item</th>
		  <th>Unit</th>
		  <th>Stok</th>
		  <th>Harga Satuan</th>
		  <th class="has-text-centered">Actions</th>
		</tr>
	  </thead>
	  <tbody>
		<tr v-for="item in items" :key="item.id">
		  <td>
			<img v-if="item.barang" :src="item.barang" style="width:100px;"/>
			<img v-else src="/fileicon.png" style="width:100px;"/>
		  </td>
		  <td>{{ item.nama_item }}</td>
			<td>{{ item.unit }}</td>
			<td>{{ item.stok }}</td>	
			<td>{{ item.harga_satuan }}</td>
		  <td class="has-text-centered">
			<router-link
			  :to="{ path: 'items/edit', name: 'EditItem', params: { id: item.id } }"
			  class="button is-info is-small"
			  >Edit</router-link
			>
			<a
			  class="button is-danger is-small"
			  @click="deleteItem(item.id)"
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
  name: "ItemList",
  data() {
	return {
	  items: [],
	};
  },
  
  created() {
	this.getItems();
  },
  
  methods: {
	// Get All Items
	async getItems() {
	  try {
		const response = await axios.get("http://localhost:5000/items");
		this.items = response.data;
	  } catch (err) {
		console.log(err);
	  }
	},
  
	// Delete Item
	async deleteItem(id) {
	  try {
		await axios.delete(`http://localhost:5000/items/${id}`);
		alert("Berhasil Delete");
		this.getItems();
	  } catch (err) {
		console.log(err);
	  }
	},
  },
};
</script>
  
<style>
</style>