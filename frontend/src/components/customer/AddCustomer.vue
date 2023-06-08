<template>
	<div>
	<br>
	<p class="is-size-3 has-text-weight-bold">Customer: Add</p>
	<br>
	<div class="field">
		<label class="label">Nama Customer</label>
		<div class="control">
		<input
			required
			class="input"
			type="text"
			v-model="nama"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Contact</label>
		<div class="control">
		<input
			required
			class="input"
			type="text"
			v-model="contact"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Email</label>
		<div class="control">
		<input
			required
			class="input"
			type="text"
			v-model="email"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Alamat</label>
		<div class="control">
		<input
			required
			class="input"
			type="text"
			v-model="alamat"
		/>
		</div>
	</div>
	
	<div class="field">
		<label class="label">Tipe Diskon</label>
		<div class="select">
		<select required v-model="tipe_diskon_id">
			<option value="1">Persentase</option>
			<option value="2">Fix Diskon</option>
		</select>
		</div>
	</div>

	<div class="field">
		<label class="label">Diskon</label>
		<div class="control">
		<input
			required
			class="input"
			type="number"
			v-model="diskon"
		/>
		</div>
	</div>

	<label class="label">Foto KTP</label>
	<div class="file">
		<input required type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" />
	</div>
	
	<br>
	<p>Semua field harus diisi.</p>
	<br>
	<div class="control">
		<button class="button is-success" @click="saveCustomer">SAVE</button>
	</div>
	</div>
</template>
	
<script>
// import axios
import axios from "axios";
	
export default {
	name: "AddCustomer",
	data() {
		return {
			nama: "",
			contact: "",
			email: "",
			alamat: "",
			tipe_diskon_id: "",
			diskon: "",
			ktp: "",
		};
	},
	methods: {
		// Create New Customer
		async saveCustomer() {
			try {
				let formData = new FormData();
				formData.append('nama', this.nama);
				formData.append('contact', this.contact);
				formData.append('email', this.email);
				formData.append('alamat', this.alamat);
				formData.append('tipe_diskon_id', this.tipe_diskon_id);
				formData.append('diskon', this.diskon);
				formData.append('ktp', this.ktp);

				await axios.post("http://localhost:5000/Customers", 
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				);

				this.nama = "";
				this.contact = "";
				this.email = "";
				this.alamat = "";
				this.tipe_diskon_id = "";
				this.diskon = "";
				this.ktp = "";

				alert("Berhasil Add");
				
				this.$router.push("/Customers");

			} catch (err) {
				console.log(err);
			}
		},

		onChangeFileUpload(){
			this.ktp = this.$refs.file.files[0];
		}
	},
};
</script>
	
<style>
</style>