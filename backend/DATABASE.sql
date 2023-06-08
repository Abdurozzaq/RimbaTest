CREATE TABLE `customer` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `nama` VARCHAR(250) NOT NULL,
  `contact` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `alamat` LONGTEXT NOT NULL,
  `tipe_diskon_id` INT NOT NULL DEFAULT 0 ,
  `ktp` VARCHAR(250) NULL,
  `diskon` INT NOT NULL DEFAULT 0 ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `item` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `nama_item` VARCHAR(250) NOT NULL,
  `unit_id` INT NOT NULL,
  `stok` INT NOT NULL DEFAULT 0 ,
  `harga_satuan` INT NOT NULL DEFAULT 0 ,
  `barang` VARCHAR(250) NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `master_tipe_diskon` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `tipe_diskon` VARCHAR(250) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `master_unit` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `unit` VARCHAR(250) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `sales` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `code_transaksi` VARCHAR(250) NOT NULL,
  `tanggal_transaksi` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `customer_id` INT NOT NULL,
  `total_diskon` INT NOT NULL,
  `total_harga` INT NOT NULL,
  `total_bayar` INT NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`, `code_transaksi`)
);
CREATE TABLE `sales_item` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `item_id` INT NOT NULL,
  `sales_id` INT NOT NULL,
  `qty` INT NOT NULL,
  `total_harga_item` INT NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO `customer` (`id`, `nama`, `contact`, `email`, `alamat`, `tipe_diskon_id`, `ktp`, `diskon`) VALUES (1, 'Budi', '089603363131', 'budi@yopmail.com', 'Jl. Karaya No. 1', 1, NULL, 10);
INSERT INTO `customer` (`id`, `nama`, `contact`, `email`, `alamat`, `tipe_diskon_id`, `ktp`, `diskon`) VALUES (2, 'Yuka', '089603363232', 'yuka@yopmail.com', 'Jl. Saroyu No. 2', 0, NULL, 0);
INSERT INTO `item` (`id`, `nama_item`, `unit_id`, `stok`, `harga_satuan`, `barang`) VALUES (1, 'Laptop', 2, 6, 5000000, NULL);
INSERT INTO `item` (`id`, `nama_item`, `unit_id`, `stok`, `harga_satuan`, `barang`) VALUES (2, 'Monitor', 2, 9, 2000000, NULL);
INSERT INTO `master_tipe_diskon` (`id`, `tipe_diskon`) VALUES (1, 'persentase');
INSERT INTO `master_tipe_diskon` (`id`, `tipe_diskon`) VALUES (2, 'fix');
INSERT INTO `master_unit` (`id`, `unit`) VALUES (1, 'kg');
INSERT INTO `master_unit` (`id`, `unit`) VALUES (2, 'pcs');
INSERT INTO `sales` (`id`, `code_transaksi`, `tanggal_transaksi`, `customer_id`, `total_diskon`, `total_harga`, `total_bayar`) VALUES (1, 'SALES111948', '2023-06-07 11:32:49', 1, 1500000, 13500000, 15000000);
INSERT INTO `sales` (`id`, `code_transaksi`, `tanggal_transaksi`, `customer_id`, `total_diskon`, `total_harga`, `total_bayar`) VALUES (2, 'SALES431796', '2023-06-07 11:33:14', 1, 700000, 6300000, 7000000);
INSERT INTO `sales_item` (`id`, `item_id`, `sales_id`, `qty`, `total_harga_item`) VALUES (1, 1, 1, 3, 15000000);
INSERT INTO `sales_item` (`id`, `item_id`, `sales_id`, `qty`, `total_harga_item`) VALUES (2, 2, 2, 1, 2000000);
INSERT INTO `sales_item` (`id`, `item_id`, `sales_id`, `qty`, `total_harga_item`) VALUES (3, 1, 2, 1, 5000000);
SET FOREIGN_KEY_CHECKS = 1;