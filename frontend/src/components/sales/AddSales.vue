<template>
	<div>
	<br>
	<p class="is-size-3 has-text-weight-bold">Sales: Add New</p>
	<br>
	<div class="field">
		<label class="label">Code Transaksi</label>
		<div class="control">
		<input
			required
			readonly
			class="input"
			type="text"
			v-model="code_transaksi"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Tanggal Transaksi</label>
		<div class="control">
		<input
			required
			readonly
			class="input"
			type="text"
			v-model="tanggal_transaksi"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Pilih Item Yang Ingin Di Beli</label>
		<div class="select">
		<select required v-model="item_id" @change="checkStok()">
			<option selected disabled value="test" >Pilih Item</option>
			<option v-for="item in itemOptions" :key="item.id" :value="item.id">{{ item.nama_item }}</option>
		</select>
		</div>
	</div>

	<hr>
	<div class="field">
		<label class="label">Pilih Item Yang Ingin Di Beli</label>
		<div class="select">
		<select required v-model="qty">
			<option selected disabled value="test" >Pilih Qty</option>
			<option v-for="n in current_stok" :key="n" :value="n">{{ n }}</option>
		</select>
		</div>
	</div>

	<button class="button is-success" @click="addItem">Add Item</button>

	<table class="table is-striped is-bordered mt-2 is-fullwidth">
		<thead>
			<tr>
				<th>Nama Item</th>
				<th>Qty</th>
				<th>Harga Satuan</th>
				<th>Total Harga Item</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="si in selectedItems" :key="si.id">
				<td>{{ si.nama_item }}</td>
				<td>{{ si.qty }}</td>
				<td>{{ si.harga_satuan }}</td>
				<td>{{ si.total_harga_item }}</td>
				<td>
					<a 
						class="button is-danger is-small"
						@click="deleteItem(si.id)"
					>Delete</a>
				</td>
			</tr>
		</tbody>
	</table>

	<hr>

	<div class="field">
		<label class="label">Total Diskon</label>
		<div class="control">
		<input
			required
			readonly
			class="input"
			type="text"
			v-model="total_diskon"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Total Harga</label>
		<div class="control">
		<input
			required
			readonly
			class="input"
			type="text"
			v-model="total_harga"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Pilih Customer</label>
		<div class="select">
		<select required v-model="customer_id" @change="calculateTotal()">
			<option selected disabled value="test">Pilih Customer</option>
			<option v-for="customer in customerOptions" :key="customer.id" :value="customer.id">{{ customer.email }} - {{ customer.nama }}</option>
		</select>
		</div>
	</div>

	<br>
	<p>Semua field harus diisi berurutan.</p>
	<p>Dengan mengklik "Create Order" maka order tersebut sudah dibayar lunas.</p>
	<br>
	<div class="control">
		<button class="button is-success" @click="saveItem">Create Order</button>
	</div>
	<br>
	<br>
	</div>
</template>
	
<script>
// import axios
import axios from "axios";
	
export default {
	name: "AddSales",
	data() {
		return {
			code_transaksi: "",
			tanggal_transaksi: "",
			total_diskon: "0",
			total_harga: "0",
			total_bayar: "test",
			customer_id: "test",
			items: [],
			// For Form Options
			customerOptions: [],
			itemOptions: [],
			// For Create Order
			selectedItems: [],
			item_id: "test",
			qty: "",
			current_stok: [],
		};
	},
	created() {
		this.prepareDefaultValues();
		this.getCustomers();
		this.getItems();
	},
	methods: {
		// Create New item
		async saveItem() {
			try {
				let formData = new FormData();
				formData.append('code_transaksi', this.code_transaksi);
				formData.append('tanggal_transaksi', this.tanggal_transaksi);
				formData.append('customer_id', this.customer_id);
				formData.append('total_diskon', this.total_diskon);
				formData.append('total_harga', this.total_harga);
				formData.append('total_harga', this.total_harga);
				formData.append('total_bayar', this.total_bayar);
				formData.append('items', []);

				await axios.post("http://localhost:5000/sales", 
				{
					'code_transaksi':  this.code_transaksi,
					'tanggal_transaksi':  this.tanggal_transaksi,
					'customer_id':  this.customer_id,
					'total_diskon':  this.total_diskon,
					'total_harga':  this.total_harga,
					'total_harga':  this.total_harga,
					'total_bayar':  this.total_bayar,
					'items':  this.selectedItems,
				});
				
				this.$router.push("/sales");

			} catch (err) {
				console.log(err);
			}
		},

		// Get All Items
		async getItems() {
			try {
				const response = await axios.get("http://localhost:5000/items");
				this.itemOptions = response.data;
			} catch (err) {
				console.log(err);
			}
		},

		// Get All Customers
		async getCustomers() {
			try {
				const response = await axios.get("http://localhost:5000/customers");
				this.customerOptions = response.data;
			} catch (err) {
				console.log(err);
			}
		},

		prepareDefaultValues (){
			this.code_transaksi = "SALES" + Math.floor(100000 + Math.random() * 900000);
			this.tanggal_transaksi = new Date().toISOString().slice(0, 19).replace('T', ' ');
		},

		addItem() {
			var indexOfItem = this.itemOptions.findIndex(x => x.id === this.item_id);
			var itemObj = {
				id: this.itemOptions[indexOfItem]['id'],
				nama_item: this.itemOptions[indexOfItem]['nama_item'],
				qty: this.qty,
				harga_satuan: this.itemOptions[indexOfItem]['harga_satuan'],
				total_harga_item: this.itemOptions[indexOfItem]['harga_satuan'] * this.qty,
			};
			this.selectedItems.push(itemObj);
		},

		deleteItem(id) {
			var indexOfItem = this.selectedItems.findIndex(x => x.id === id);
			this.selectedItems.splice(indexOfItem, 1);
		},

		checkStok() {
			var indexOfItem = this.itemOptions.findIndex(x => x.id === this.item_id);
			var stok = this.itemOptions[indexOfItem]['stok'];
			for (let i = 0; i <= stok; i++) {
				this.current_stok.push(i);
			}		
		},

		calculateTotal() {
			var indexOfItem = this.customerOptions.findIndex(x => x.id === this.customer_id);

			var tipe_diskon = this.customerOptions[indexOfItem]['tipe_diskon'];
			var diskon = this.customerOptions[indexOfItem]['diskon'];

			var totalHargaAllItem = 0;
			this.selectedItems.map(function(it) {
				totalHargaAllItem = totalHargaAllItem + it.total_harga_item;
			})

			if (tipe_diskon === "persentase") {
				var local_total_diskon = diskon / 100 * totalHargaAllItem;
				var local_total_harga = totalHargaAllItem - local_total_diskon;

				this.total_diskon = local_total_diskon;
				this.total_harga = local_total_harga;
			} else if (tipe_diskon === "fix") {
				this.total_diskon = diskon;
				this.total_harga = totalHargaAllItem - diskon;
			} else {
				this.total_diskon = 0;
				this.total_harga = totalHargaAllItem;
			}

			this.total_bayar = totalHargaAllItem;
		}
	},
};
</script>
	
<style>
</style>