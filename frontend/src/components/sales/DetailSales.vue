<template>
	<div>
		<br>
		<p class="is-size-3 has-text-weight-bold">Sales: Detail</p>
		<br>
		<br>
		<br>
		<h1 class="is-size-3 has-text-weight-bold">Order Details</h1>
		<br>
		<p><strong>Sales Order:</strong><br>{{ code_transaksi }}</p>
		<p><strong>Tanggal Transaksi:</strong><br> {{ tanggal_transaksi }}</p>
		<p><strong>Total Diskon:</strong><br> {{ total_diskon }}</p>
		<p><strong>Total Harga:</strong><br> {{ total_harga }}</p>
		<p><strong>Total Bayar:</strong><br> {{ total_bayar }}</p>

		<br>

		<h4><strong>Informasi Customer:</strong><br> </h4><br>
		<p><strong>Nama:</strong><br> {{ nama }}</p>
		<p><strong>Contact (Telepon):</strong><br> {{ contact }}</p>
		<p><strong>Email:</strong><br> {{ email }}</p>
		<p><strong>Alamat:</strong><br> {{ alamat }}</p>
		<p><strong>Tipe Diskon Customer:</strong><br> {{ tipe_diskon }}</p>
		<p><strong>Diskon:</strong><br> {{ diskon }}</p>

		<br>

		<h4><strong>Daftar Item Yang Dibeli:</strong><br> </h4><br>
		<table class="table is-striped is-bordered mt-2 is-fullwidth">
			<thead>
				<tr>
					<th>Nama Item</th>
					<th>Qty</th>
					<th>Harga Satuan</th>
					<th>Total Harga Item</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items" :key="item.id">
					<td>{{ item.nama_item }}</td>
					<td>{{ item.qty }}</td>
					<td>{{ item.harga_satuan }}</td>
					<td>{{ item.total_harga_item }}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<br>
	<br>
	<br>
	<br>
</template>
	
<script>
// import axios
import axios from "axios";
	
export default {
	name: "DetailSales",
	data() {
		return {
			code_transaksi: "",
			tanggal_transaksi: "",
			total_diskon: "",
			total_harga: "",
			total_bayar: "",
			nama: "",
			contact: "",
			email: "",
			alamat: "",
			tipe_diskon: "",
			diskon: "",
			items: [],
		};
	},
    created: function () {
        this.getSalesById();
    },
	methods: {
        // Get Item By Id
        async getSalesById() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/sales/${this.$route.params.id}`
                );

                this.code_transaksi = response.data[0].code_transaksi;
                this.tanggal_transaksi = response.data[0].tanggal_transaksi;
                this.total_diskon = response.data[0].total_diskon;
                this.total_harga = response.data[0].total_harga;
                this.total_bayar = response.data[0].total_bayar;
				this.nama = response.data[0].total_bayar;
				this.contact = response.data[0].contact;
				this.email = response.data[0].email;
				this.alamat = response.data[0].alamat;
				this.tipe_diskon = response.data[0].tipe_diskon;
				this.diskon = response.data[0].diskon;
				this.items = response.data[0].items;

            } catch (err) {
                console.log(err);
            }
        },
	},
};
</script>
	
<style>
</style>