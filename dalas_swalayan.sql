-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 26, 2026 at 03:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dalas_swalayan`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2a$10$7j8CcZGFagel0.AimW1gG.5K1aOWqFyLN5COy1DFPKRtmPw/OatzG', '2026-05-23 18:21:48.383', '2026-05-23 18:21:48.383');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `image_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `created_at`, `updated_at`, `image_url`) VALUES
(1, 'Minuman', 'Aneka minuman ringan dan mineral', 'Droplet', '2026-05-23 02:42:54.121', '2026-05-25 22:38:04.362', 'http://localhost:8080/uploads/img_1779723483758507700.webp'),
(2, 'Kebutuhan Dapur', 'Beras, minyak goreng, gula, dan bumbu', 'Package', '2026-05-23 02:54:50.843', '2026-05-25 22:37:47.441', 'http://localhost:8080/uploads/img_1779723465918624100.jpg'),
(3, 'Sembako', 'Sembilan Bahan Pokok', 'ShoppingBag', '2026-05-23 03:03:06.030', '2026-05-25 22:38:45.926', 'http://localhost:8080/uploads/img_1779723525027166000.jpg'),
(4, 'Makanan Ringan', 'Makanan Ringan', 'Cookie', '2026-05-23 11:44:11.949', '2026-05-25 22:37:54.900', 'http://localhost:8080/uploads/img_1779723473981670200.jpg'),
(5, 'frozen food', 'frozen food', 'Package', '2026-05-24 01:33:09.011', '2026-05-24 01:35:14.564', 'http://localhost:8080/uploads/img_1779561314028005900.jpg'),
(6, 'Perawatan Diri & Kosmetik', 'Sabun mandi, shampo, pasta gigi, deodorant, dan perawatan kulit', 'Package', '2026-05-24 01:50:32.199', '2026-05-25 22:38:26.309', 'http://localhost:8080/uploads/img_1779723505206015500.jpg'),
(7, 'Kebutuhan Bayi & Anak', 'Susu bayi, popok, bedak bayi, dan makanan pendamping asi', 'Package', '2026-05-24 01:50:32.224', '2026-05-25 22:37:39.293', 'http://localhost:8080/uploads/img_1779723458460380100.jpg'),
(8, 'Perawatan Rumah', 'Deterjen, pewangi pakaian, sabun cuci piring, dan pembersih lantai', 'Package', '2026-05-24 01:50:32.230', '2026-05-25 22:38:33.901', 'http://localhost:8080/uploads/img_1779723513093983000.jpg'),
(9, 'Obat & Suplemen', 'Obat generik ringan, vitamin, madu, dan minyak angin', 'Package', '2026-05-24 01:50:32.237', '2026-05-25 22:38:11.868', 'http://localhost:8080/uploads/img_1779723489733067200.png'),
(10, 'Roti & Kue', 'Roti tawar, roti manis, biskuit kering, dan wafer', 'Package', '2026-05-24 01:50:32.244', '2026-05-25 22:38:39.990', 'http://localhost:8080/uploads/img_1779723519452367800.webp'),
(11, 'Bumbu & Saus', 'Kecap, saus sambal, kaldu instan, terasi, dan bumbu dapur', 'Package', '2026-05-24 01:50:32.251', '2026-05-25 22:37:24.402', 'http://localhost:8080/uploads/img_1779723443502609400.jpg'),
(12, 'Buah & Sayur', 'Buah-buahan dan sayuran segar pilihann', 'Package', '2026-05-24 01:50:32.258', '2026-05-26 00:02:25.150', 'http://localhost:8080/uploads/img_1779723434652408700.jpg'),
(13, 'Daging & Telur', 'Daging sapi, daging ayam segar, dan telur', 'Package', '2026-05-24 01:50:32.266', '2026-05-25 22:37:30.358', 'http://localhost:8080/uploads/img_1779723449823854100.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif',
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `sku`, `description`, `price`, `image_url`, `category_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Susu Kental Manis 27gr', '', 'Susu Kental Maniss', 2500.00, '', 3, 'aktif', '2026-05-23 11:27:32.712', '2026-05-26 00:05:08.663'),
(7, 'cabe 2kg', 'PRD-20260523114323', 'tes', 20000.00, '', 2, 'aktif', '2026-05-23 11:43:23.690', '2026-05-23 17:54:25.242'),
(8, 'ayam', 'PRD-20260523114342', 'ayam\n', 30000.00, '', 2, 'aktif', '2026-05-23 11:43:42.126', '2026-05-23 11:43:42.126'),
(9, 'Cabe hijau', 'PRD-20260523175649', 'Pedasss', 23000.00, '', 3, 'aktif', '2026-05-23 17:56:49.150', '2026-05-23 17:56:49.150'),
(10, 'bawang merah', 'PRD-20260524012712', 'bawang merah', 20000.00, 'http://localhost:8080/uploads/img_1779561060618528900.jpg', 3, 'aktif', '2026-05-24 01:27:12.517', '2026-05-24 12:15:51.998'),
(11, 'QTELA BALADO 185GR', 'PRD-20260524015411', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 15000.00, '', 4, 'aktif', '2026-05-24 01:54:11.136', '2026-05-24 01:54:11.136'),
(51, 'QTELA BALADO 185GR', 'PRD-1779562488537-0', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 15000.00, '', 4, 'aktif', '2026-05-24 01:54:48.550', '2026-05-24 01:54:48.550'),
(52, 'QTELA SINGKONG KERITING AYAM GEPREK 80GR', 'PRD-1779562488548-1', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 8500.00, '', 4, 'aktif', '2026-05-24 01:54:48.556', '2026-05-24 01:54:48.556'),
(53, 'CHITATO SAPI BUMBU BAKAR 75G', 'PRD-1779562488554-2', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 12000.00, '', 4, 'aktif', '2026-05-24 01:54:48.562', '2026-05-24 01:54:48.562'),
(54, 'CHITATO SAPI PANGGANG 120G', 'PRD-1779562488560-3', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 18500.00, '', 4, 'aktif', '2026-05-24 01:54:48.569', '2026-05-24 01:54:48.569'),
(55, 'QTELA ORIGINAL 185GR', 'PRD-1779562488567-4', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 15000.00, '', 4, 'aktif', '2026-05-24 01:54:48.575', '2026-05-24 01:54:48.575'),
(56, 'TWISTKO JAGUNG BAKAR 70G', 'PRD-1779562488572-5', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 7500.00, '', 4, 'aktif', '2026-05-24 01:54:48.579', '2026-05-24 01:54:48.579'),
(57, 'EMBER ANTI PECAH GM 18L', 'PRD-1779562488577-6', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 45000.00, '', 8, 'aktif', '2026-05-24 01:54:48.585', '2026-05-24 01:54:48.585'),
(58, 'EMBER ANTI PECAH GM 22L', 'PRD-1779562488582-7', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 55000.00, '', 8, 'aktif', '2026-05-24 01:54:48.590', '2026-05-24 01:54:48.590'),
(59, 'ALEXA SEAL WARE 16L 1018', 'PRD-1779562488588-8', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 32000.00, '', 8, 'aktif', '2026-05-24 01:54:48.596', '2026-05-24 01:54:48.596'),
(60, 'AQUA GALON REFFIL', 'PRD-1779562488594-9', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 21000.00, '', 1, 'aktif', '2026-05-24 01:54:48.601', '2026-05-24 01:54:48.601'),
(61, 'UNIBIS COCOPUFF 260G', 'PRD-1779562488599-10', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 14000.00, '', 10, 'aktif', '2026-05-24 01:54:48.606', '2026-05-24 01:54:48.606'),
(62, 'ENSURE GOLD RASA GANDUM 150G', 'PRD-1779562488604-11', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 120000.00, '', 9, 'aktif', '2026-05-24 01:54:48.611', '2026-05-24 01:54:48.611'),
(63, 'PROCHIZ GOLD 60G', 'PRD-1779562488610-12', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 15500.00, '', 2, 'aktif', '2026-05-24 01:54:48.617', '2026-05-24 01:54:48.617'),
(64, 'GULA GPM CURAH 1 KG', 'PRD-1779562488615-13', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 17500.00, '', 3, 'aktif', '2026-05-24 01:54:48.622', '2026-05-24 01:54:48.622'),
(65, 'NASI LAMAK YANTI', 'PRD-1779562488620-14', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 10000.00, '', 4, 'aktif', '2026-05-24 01:54:48.627', '2026-05-24 01:54:48.627'),
(66, 'PINUNGKUIK RARA', 'PRD-1779562488625-15', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 5000.00, '', 4, 'aktif', '2026-05-24 01:54:48.632', '2026-05-24 01:54:48.632'),
(67, 'MAMY POKO PANTS ROYAL SOFT GIRLS L 28', 'PRD-1779562488631-16', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 85000.00, '', 7, 'aktif', '2026-05-24 01:54:48.638', '2026-05-24 01:54:48.638'),
(68, 'MAMY POKO PANTS ROYAL SOFT BOY M42', 'PRD-1779562488636-17', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 105000.00, '', 7, 'aktif', '2026-05-24 01:54:48.643', '2026-05-24 01:54:48.643'),
(69, 'SELECTION FACIAL COTTON 75G', 'PRD-1779562488641-18', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 16000.00, '', 6, 'aktif', '2026-05-24 01:54:48.648', '2026-05-24 01:54:48.648'),
(70, 'SELECTION FACIAL COT SPL 175`S', 'PRD-1779562488647-19', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 22000.00, '', 6, 'aktif', '2026-05-24 01:54:48.654', '2026-05-24 01:54:48.654'),
(71, 'AIRPRO WOODEN AIR FRESHENER GREED AVENTUS 10ML', 'PRD-1779562488651-20', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 35000.00, '', 8, 'aktif', '2026-05-24 01:54:48.659', '2026-05-24 01:54:48.659'),
(72, 'AIRPRO WOODEN AIR FRESHENER DIOR FAHRENHIET 10ML', 'PRD-1779562488657-21', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 35000.00, '', 8, 'aktif', '2026-05-24 01:54:48.664', '2026-05-24 01:54:48.664'),
(73, 'DETTOL SHOW FOAM FRESH 410ML', 'PRD-1779562488664-22', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 42000.00, '', 6, 'aktif', '2026-05-24 01:54:48.671', '2026-05-24 01:54:48.671'),
(74, 'TOLAK ANGIN + MADU 15M', 'PRD-1779562488669-23', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 4500.00, '', 9, 'aktif', '2026-05-24 01:54:48.678', '2026-05-24 01:54:48.678'),
(75, 'AIRPRO ORGANIC AIR FRESHENER BLACK CRYSTAL 42G', 'PRD-1779562488675-24', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 28000.00, '', 8, 'aktif', '2026-05-24 01:54:48.682', '2026-05-24 01:54:48.682'),
(76, 'KARA NATA DE COCO SLICES 1000G', 'PRD-1779562488680-25', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 19000.00, '', 2, 'aktif', '2026-05-24 01:54:48.688', '2026-05-24 01:54:48.688'),
(77, 'RESTOR BLACK HAIR CREAM 130G', 'PRD-1779562488687-26', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 21000.00, '', 6, 'aktif', '2026-05-24 01:54:48.694', '2026-05-24 01:54:48.694'),
(78, 'CHARM EXTR COMFORT MAXI W 24`S', 'PRD-1779562488691-27', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 18500.00, '', 6, 'aktif', '2026-05-24 01:54:48.698', '2026-05-24 01:54:48.698'),
(79, 'COUNTERPAIN 60G', 'PRD-1779562488697-28', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 45000.00, '', 9, 'aktif', '2026-05-24 01:54:48.704', '2026-05-24 01:54:48.704'),
(80, 'COUNTERPAIN COOL 30GR', 'PRD-1779562488701-29', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 30000.00, '', 9, 'aktif', '2026-05-24 01:54:48.708', '2026-05-24 01:54:48.708'),
(81, 'ESPRESSO KOPI SUSU 175G', 'PRD-1779562488706-30', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 12000.00, '', 1, 'aktif', '2026-05-24 01:54:48.714', '2026-05-24 01:54:48.714'),
(82, 'DETTOL SF RE-ENERGIZE 410ML', 'PRD-1779562488711-31', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 40000.00, '', 6, 'aktif', '2026-05-24 01:54:48.719', '2026-05-24 01:54:48.719'),
(83, 'INDOFOOD SAUS EKSTRA PEDAS 275ML', 'PRD-1779562488717-32', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 14500.00, '', 11, 'aktif', '2026-05-24 01:54:48.724', '2026-05-24 01:54:48.724'),
(84, 'CHARMNAP URINE DRY 19CM 12P', 'PRD-1779562488722-33', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 25000.00, '', 6, 'aktif', '2026-05-24 01:54:48.729', '2026-05-24 01:54:48.729'),
(85, 'SELECTION FACIAL COTTON 50G', 'PRD-1779562488726-34', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 12000.00, '', 6, 'aktif', '2026-05-24 01:54:48.734', '2026-05-24 01:54:48.734'),
(86, 'CHARM SAFE NIGHT 42CM 14P', 'PRD-1779562488732-35', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 20000.00, '', 6, 'aktif', '2026-05-24 01:54:48.740', '2026-05-24 01:54:48.740'),
(87, 'CAP AYAM KY PUTIH 150ML', 'PRD-1779562488738-36', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 35000.00, '', 9, 'aktif', '2026-05-24 01:54:48.745', '2026-05-24 01:54:48.745'),
(88, 'FRESTEA LEMON 350ML', 'PRD-1779562488743-37', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 6500.00, '', 1, 'aktif', '2026-05-24 01:54:48.750', '2026-05-24 01:54:48.750'),
(89, 'TAHU ISI RAHMAT', 'PRD-1779562488748-38', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 5000.00, '', 4, 'aktif', '2026-05-24 01:54:48.756', '2026-05-24 01:54:48.756'),
(90, 'RISOLES PADEH MANIH KOTAK', 'PRD-1779562488753-39', 'Produk otomatis dari Laporan Item Masuk Dalas Swalayan.', 6000.00, '', 4, 'aktif', '2026-05-24 01:54:48.760', '2026-05-24 01:54:48.760'),
(91, 'QTELA BALADO 185GR', '089686611700', 'Diimpor secara otomatis dari file data-produk.pdf', 55500.00, '', 3, 'aktif', '2026-05-25 23:52:29.921', '2026-05-25 23:52:29.921'),
(92, 'QTELA SINGKONG AYAM GEPREK', '089686611120', 'Diimpor secara otomatis dari file data-produk.pdf', 10000.00, '', 3, 'aktif', '2026-05-25 23:52:30.248', '2026-05-25 23:52:30.248'),
(93, 'CHITATO SAPI BUMBU BAKAR 75G', '089686598599', 'Diimpor secara otomatis dari file data-produk.pdf', 99500.00, '', 3, 'aktif', '2026-05-25 23:52:30.441', '2026-05-25 23:52:30.441'),
(94, 'CHITATO SAPI PANGGANG 120G', '089686598896', 'Diimpor secara otomatis dari file data-produk.pdf', 16500.00, '', 3, 'aktif', '2026-05-25 23:52:30.595', '2026-05-25 23:52:30.595'),
(95, 'QTELA ORIGINAL 185GR', '089686611540', 'Diimpor secara otomatis dari file data-produk.pdf', 53500.00, '', 3, 'aktif', '2026-05-25 23:52:30.970', '2026-05-25 23:52:30.970'),
(96, 'TWISTKO JAGUNG BAKAR 70G', '8886013221203', 'Diimpor secara otomatis dari file data-produk.pdf', 23000.00, '', 3, 'aktif', '2026-05-25 23:52:30.987', '2026-05-25 23:52:30.987'),
(97, 'EMBER ANTI PECAH GM 18L', '0199016015', 'Diimpor secara otomatis dari file data-produk.pdf', 84500.00, '', 5, 'aktif', '2026-05-25 23:52:30.991', '2026-05-25 23:52:30.991'),
(98, 'EMBER ANTI PECAH GM 22L', '0199016016', 'Diimpor secara otomatis dari file data-produk.pdf', 24500.00, '', 5, 'aktif', '2026-05-25 23:52:30.997', '2026-05-25 23:52:30.997'),
(99, 'EMBER ANTI PECAH GM 26L', '0199016002', 'Diimpor secara otomatis dari file data-produk.pdf', 18000.00, '', 5, 'aktif', '2026-05-25 23:52:31.002', '2026-05-25 23:52:31.002'),
(100, 'ALEXA SEAL WARE 16L', '8997006809879', 'Diimpor secara otomatis dari file data-produk.pdf', 29500.00, '', 5, 'aktif', '2026-05-25 23:52:31.007', '2026-05-25 23:52:31.007'),
(101, 'AQUA GALON REFFIL', '0701120001', 'Diimpor secara otomatis dari file data-produk.pdf', 82000.00, '', 2, 'aktif', '2026-05-25 23:52:31.013', '2026-05-25 23:52:31.013'),
(102, 'UNIBIS COCOPUFF 260G', '8887229014306', 'Diimpor secara otomatis dari file data-produk.pdf', 52000.00, '', 3, 'aktif', '2026-05-25 23:52:31.019', '2026-05-25 23:52:31.019'),
(103, 'QTELA BARBEQUE 185 G', '089686611649', 'Diimpor secara otomatis dari file data-produk.pdf', 83000.00, '', 3, 'aktif', '2026-05-25 23:52:31.023', '2026-05-25 23:52:31.023'),
(104, 'ENSURE GOLD RASA GANDUM 150G', '8886451007568', 'Diimpor secara otomatis dari file data-produk.pdf', 84000.00, '', 2, 'aktif', '2026-05-25 23:52:31.028', '2026-05-25 23:52:31.028'),
(105, 'PROCHIZ GOLD 60G', '8997014450452', 'Diimpor secara otomatis dari file data-produk.pdf', 52500.00, '', 1, 'aktif', '2026-05-25 23:52:31.032', '2026-05-25 23:52:31.032'),
(106, 'GULA GPM CURAH 1 KG', '0200171062', 'Diimpor secara otomatis dari file data-produk.pdf', 99000.00, '', 1, 'aktif', '2026-05-25 23:52:31.037', '2026-05-25 23:52:31.037'),
(107, 'NASI LAMAK YANTI', '0201280004', 'Diimpor secara otomatis dari file data-produk.pdf', 104500.00, '', 1, 'aktif', '2026-05-25 23:52:31.042', '2026-05-25 23:52:31.042'),
(108, 'PINUNGKUIK RARA', '0201240002', 'Diimpor secara otomatis dari file data-produk.pdf', 22000.00, '', 3, 'aktif', '2026-05-25 23:52:31.047', '2026-05-25 23:52:31.047'),
(109, 'MAMY POKO PANTS ROYAL SOFT GIRLS', '8851111401178', 'Diimpor secara otomatis dari file data-produk.pdf', 77500.00, '', 4, 'aktif', '2026-05-25 23:52:31.051', '2026-05-25 23:52:31.051'),
(110, 'MAMY POKO PANTS BOY M42', '8993189700033', 'Diimpor secara otomatis dari file data-produk.pdf', 35000.00, '', 4, 'aktif', '2026-05-25 23:52:31.056', '2026-05-25 23:52:31.056'),
(111, 'SELECTION FACIAL COTTON 75G', '8991038111757', 'Diimpor secara otomatis dari file data-produk.pdf', 65500.00, '', 4, 'aktif', '2026-05-25 23:52:31.060', '2026-05-25 23:52:31.060'),
(112, 'AIRPRO WOODEN AIR FRESHENER', '6922420473001', 'Diimpor secara otomatis dari file data-produk.pdf', 50500.00, '', 5, 'aktif', '2026-05-25 23:52:31.064', '2026-05-25 23:52:31.064'),
(113, 'SELECTION FACIAL COTTON 35G', '8991038110354', 'Diimpor secara otomatis dari file data-produk.pdf', 40500.00, '', 4, 'aktif', '2026-05-25 23:52:31.069', '2026-05-25 23:52:31.069'),
(114, 'AIRPRO DIOR FAHRENHIET', '6922420472967', 'Diimpor secara otomatis dari file data-produk.pdf', 74000.00, '', 5, 'aktif', '2026-05-25 23:52:31.074', '2026-05-25 23:52:31.074'),
(115, 'AIRPRO PAPER COFFEE 4G', '6922420472943', 'Diimpor secara otomatis dari file data-produk.pdf', 87000.00, '', 5, 'aktif', '2026-05-25 23:52:31.079', '2026-05-25 23:52:31.079'),
(116, 'DETTOL SHOW FOAM FRESH 410ML', '8993560026042', 'Diimpor secara otomatis dari file data-produk.pdf', 27500.00, '', 4, 'aktif', '2026-05-25 23:52:31.085', '2026-05-25 23:52:31.085'),
(117, 'AIRPRO CHANEL NO.5 10ML', '6922420473018', 'Diimpor secara otomatis dari file data-produk.pdf', 69500.00, '', 5, 'aktif', '2026-05-25 23:52:31.090', '2026-05-25 23:52:31.090'),
(118, 'AIRPRO FRESH LEMON 9ML', '6922420410976', 'Diimpor secara otomatis dari file data-produk.pdf', 36500.00, '', 5, 'aktif', '2026-05-25 23:52:31.094', '2026-05-25 23:52:31.094'),
(119, 'TOLAK ANGIN + MADU 15M', '8998898101409', 'Diimpor secara otomatis dari file data-produk.pdf', 85500.00, '', 4, 'aktif', '2026-05-25 23:52:31.098', '2026-05-25 23:52:31.098'),
(120, 'KARA NATA DE COCO 1000G', '8992717900129', 'Diimpor secara otomatis dari file data-produk.pdf', 23000.00, '', 1, 'aktif', '2026-05-25 23:52:31.104', '2026-05-25 23:52:31.104'),
(121, 'RESTOR BLACK HAIR CREAM 130G', '8993035123450', 'Diimpor secara otomatis dari file data-produk.pdf', 49500.00, '', 4, 'aktif', '2026-05-25 23:52:31.109', '2026-05-25 23:52:31.109'),
(122, 'CHARM EXTR COMFORT MAXI 24S', '8993189322549', 'Diimpor secara otomatis dari file data-produk.pdf', 46500.00, '', 4, 'aktif', '2026-05-25 23:52:31.113', '2026-05-25 23:52:31.113'),
(123, 'COUNTERPAIN 60G', '8995201800035', 'Diimpor secara otomatis dari file data-produk.pdf', 52000.00, '', 4, 'aktif', '2026-05-25 23:52:31.118', '2026-05-25 23:52:31.118'),
(124, 'ESPRESSO KOPI SUSU 175G', '8991002306813', 'Diimpor secara otomatis dari file data-produk.pdf', 86500.00, '', 2, 'aktif', '2026-05-25 23:52:31.123', '2026-05-25 23:52:31.123'),
(125, 'INDOFOOD SAUS EKSTRA PEDAS 275ML', '089686400854', 'Diimpor secara otomatis dari file data-produk.pdf', 63500.00, '', 1, 'aktif', '2026-05-25 23:52:31.127', '2026-05-25 23:52:31.127'),
(126, 'CHARMNAP URINE DRY 19CM', '8993189382024', 'Diimpor secara otomatis dari file data-produk.pdf', 90000.00, '', 4, 'aktif', '2026-05-25 23:52:31.132', '2026-05-25 23:52:31.132'),
(127, 'MAMY POKO PANTS ROYAL L52', '8851111401635', 'Diimpor secara otomatis dari file data-produk.pdf', 83000.00, '', 4, 'aktif', '2026-05-25 23:52:31.137', '2026-05-25 23:52:31.137'),
(128, 'CHARM SAFE NIGHT 42CM 14P', '8993189700828', 'Diimpor secara otomatis dari file data-produk.pdf', 78000.00, '', 4, 'aktif', '2026-05-25 23:52:31.141', '2026-05-25 23:52:31.141'),
(129, 'SELECTION FACIAL COT TEBAL 60S', '8991038775997', 'Diimpor secara otomatis dari file data-produk.pdf', 12500.00, '', 4, 'aktif', '2026-05-25 23:52:31.146', '2026-05-25 23:52:31.146'),
(130, 'CAP AYAM KY PUTIH 150ML', '8997229320045', 'Diimpor secara otomatis dari file data-produk.pdf', 90500.00, '', 1, 'aktif', '2026-05-25 23:52:31.151', '2026-05-25 23:52:31.151'),
(131, 'FRESTEA LEMON 350ML', '8992761166267', 'Diimpor secara otomatis dari file data-produk.pdf', 104000.00, '', 2, 'aktif', '2026-05-25 23:52:31.156', '2026-05-25 23:52:31.156'),
(132, 'INDOMIE KARI AYAM 69G', '089686010190', 'Diimpor secara otomatis dari file data-produk.pdf', 42500.00, '', 1, 'aktif', '2026-05-25 23:52:31.160', '2026-05-25 23:52:31.160'),
(133, 'INDOMIE GORENG SPEC 80G', '089686010824', 'Diimpor secara otomatis dari file data-produk.pdf', 56000.00, '', 1, 'aktif', '2026-05-25 23:52:31.166', '2026-05-25 23:52:31.166'),
(134, 'INDOMIE AYAM BAWANG 69G', '089686010015', 'Diimpor secara otomatis dari file data-produk.pdf', 78500.00, '', 1, 'aktif', '2026-05-25 23:52:31.172', '2026-05-25 23:52:31.172'),
(135, 'POP MIE KARI AYAM 60G', '089686060461', 'Diimpor secara otomatis dari file data-produk.pdf', 21500.00, '', 1, 'aktif', '2026-05-25 23:52:31.177', '2026-05-25 23:52:31.177'),
(136, 'POP MIE SOTO AYAM 60G', '089686060362', 'Diimpor secara otomatis dari file data-produk.pdf', 66500.00, '', 1, 'aktif', '2026-05-25 23:52:31.182', '2026-05-25 23:52:31.182'),
(137, 'POP MIE RASA BASO 57G', '089686060126', 'Diimpor secara otomatis dari file data-produk.pdf', 73000.00, '', 1, 'aktif', '2026-05-25 23:52:31.188', '2026-05-25 23:52:31.188'),
(138, 'WONG COCO MY JELLY 210G', '8998288016634', 'Diimpor secara otomatis dari file data-produk.pdf', 51500.00, '', 3, 'aktif', '2026-05-25 23:52:31.192', '2026-05-25 23:52:31.192'),
(139, 'SHINZUI SCRUB LULUR HANA 200G', '8992946519345', 'Diimpor secara otomatis dari file data-produk.pdf', 19000.00, '', 4, 'aktif', '2026-05-25 23:52:31.196', '2026-05-25 23:52:31.196'),
(140, 'SHINZUI LATION SAKURA 100M', '8992946522291', 'Diimpor secara otomatis dari file data-produk.pdf', 94000.00, '', 4, 'aktif', '2026-05-25 23:52:31.202', '2026-05-25 23:52:31.202'),
(141, 'SHINZUI LOTION KIREI 100M', '8992946513299', 'Diimpor secara otomatis dari file data-produk.pdf', 92000.00, '', 4, 'aktif', '2026-05-25 23:52:31.205', '2026-05-25 23:52:31.205'),
(142, 'SHINZUI CLEANSER 250M', '8992946513350', 'Diimpor secara otomatis dari file data-produk.pdf', 104500.00, '', 4, 'aktif', '2026-05-25 23:52:31.210', '2026-05-25 23:52:31.210'),
(143, 'SOKLIN LT UNGU 450M', '8998866603546', 'Diimpor secara otomatis dari file data-produk.pdf', 10500.00, '', 5, 'aktif', '2026-05-25 23:52:31.213', '2026-05-25 23:52:31.213'),
(144, 'ZINC SHP BLACK SHINE 340ML', '8998866106450', 'Diimpor secara otomatis dari file data-produk.pdf', 26000.00, '', 4, 'aktif', '2026-05-25 23:52:31.218', '2026-05-25 23:52:31.218'),
(145, 'PRENDJAK TEH CELUP 25S', '8997023760016', 'Diimpor secara otomatis dari file data-produk.pdf', 39500.00, '', 2, 'aktif', '2026-05-25 23:52:31.223', '2026-05-25 23:52:31.223'),
(146, 'CBS COKKA 150G', '8994163700025', 'Diimpor secara otomatis dari file data-produk.pdf', 34500.00, '', 2, 'aktif', '2026-05-25 23:52:31.227', '2026-05-25 23:52:31.227'),
(147, 'SOKLIN SOFTENER UNGU 1800M', '8998866604758', 'Diimpor secara otomatis dari file data-produk.pdf', 55000.00, '', 5, 'aktif', '2026-05-25 23:52:31.236', '2026-05-25 23:52:31.236'),
(148, 'ABC SAMBAL ASLI 275ML', '711844120419', 'Diimpor secara otomatis dari file data-produk.pdf', 28000.00, '', 1, 'aktif', '2026-05-25 23:52:31.240', '2026-05-25 23:52:31.240'),
(149, 'DAIA SENSASI LEMON 263G', '8998866604963', 'Diimpor secara otomatis dari file data-produk.pdf', 55500.00, '', 5, 'aktif', '2026-05-25 23:52:31.244', '2026-05-25 23:52:31.244'),
(150, 'GOOD DAY FUNTASTIC MOCA 250ML', '8991002121010', 'Diimpor secara otomatis dari file data-produk.pdf', 96500.00, '', 2, 'aktif', '2026-05-25 23:52:31.248', '2026-05-25 23:52:31.248'),
(151, 'ICHITAN THAI MILK COFFE 310ML', '8997218380128', 'Diimpor secara otomatis dari file data-produk.pdf', 18000.00, '', 2, 'aktif', '2026-05-25 23:52:31.253', '2026-05-25 23:52:31.253'),
(152, 'ICHITAN THAI MILK TEA 310ML', '8997218380074', 'Diimpor secara otomatis dari file data-produk.pdf', 54500.00, '', 2, 'aktif', '2026-05-25 23:52:31.256', '2026-05-25 23:52:31.256'),
(153, 'WONG COCO NATA DECOCO 360G', '8998288360331', 'Diimpor secara otomatis dari file data-produk.pdf', 30500.00, '', 1, 'aktif', '2026-05-25 23:52:31.260', '2026-05-25 23:52:31.260'),
(154, 'GOOD DAY TIRAMISU BLISS 250ML', '8991002121003', 'Diimpor secara otomatis dari file data-produk.pdf', 97500.00, '', 2, 'aktif', '2026-05-25 23:52:31.263', '2026-05-25 23:52:31.263'),
(155, 'PROMINA PUFF 8+ PISANG 15G', '089686640007', 'Diimpor secara otomatis dari file data-produk.pdf', 64000.00, '', 3, 'aktif', '2026-05-25 23:52:31.269', '2026-05-25 23:52:31.269'),
(156, 'PROMINA PUFF BLUE BERRY 15G', '089686640014', 'Diimpor secara otomatis dari file data-produk.pdf', 7500.00, '', 3, 'aktif', '2026-05-25 23:52:31.273', '2026-05-25 23:52:31.273'),
(157, 'INDOFOOD SAMBAL PEDAS 335ML', '089686400465', 'Diimpor secara otomatis dari file data-produk.pdf', 41000.00, '', 1, 'aktif', '2026-05-25 23:52:31.277', '2026-05-25 23:52:31.277'),
(158, 'PIA 100 PANDAN 150G', '8992942120187', 'Diimpor secara otomatis dari file data-produk.pdf', 17000.00, '', 3, 'aktif', '2026-05-25 23:52:31.280', '2026-05-25 23:52:31.280'),
(159, 'SUPERMIE SEMUR AYAM PDS 70G', '089686014617', 'Diimpor secara otomatis dari file data-produk.pdf', 89000.00, '', 1, 'aktif', '2026-05-25 23:52:31.286', '2026-05-25 23:52:31.286'),
(160, 'SARIMI 2 GORENG AYAM PEDAS 120G', '089686048094', 'Diimpor secara otomatis dari file data-produk.pdf', 42000.00, '', 1, 'aktif', '2026-05-25 23:52:31.290', '2026-05-25 23:52:31.290'),
(161, 'SUN MARIE ROLL KECIL 80GR', '0089686646047', 'Diimpor secara otomatis dari file data-produk.pdf', 10000.00, '', 3, 'aktif', '2026-05-25 23:52:31.295', '2026-05-25 23:52:31.295'),
(162, 'INDOMILK SKM PUTIH 6X42G', '8993007001694', 'Diimpor secara otomatis dari file data-produk.pdf', 31500.00, '', 2, 'aktif', '2026-05-25 23:52:31.300', '2026-05-25 23:52:31.300'),
(163, 'CAP KAKI TIGA MARKISA 320ML', '8995227501039', 'Diimpor secara otomatis dari file data-produk.pdf', 84000.00, '', 2, 'aktif', '2026-05-25 23:52:31.304', '2026-05-25 23:52:31.304'),
(164, 'REFINA GARAM MEJA 250G', '8993226112508', 'Diimpor secara otomatis dari file data-produk.pdf', 67000.00, '', 1, 'aktif', '2026-05-25 23:52:31.309', '2026-05-25 23:52:31.309'),
(165, 'BABY HAPPY PANTS XXL24', '8998866500654', 'Diimpor secara otomatis dari file data-produk.pdf', 74000.00, '', 4, 'aktif', '2026-05-25 23:52:31.312', '2026-05-25 23:52:31.312'),
(166, 'GAYUNG FEBBY HOMMY 7201', '8997006800357', 'Diimpor secara otomatis dari file data-produk.pdf', 99500.00, '', 5, 'aktif', '2026-05-25 23:52:31.317', '2026-05-25 23:52:31.317'),
(167, 'NAMPAN KAYU SEGI KWI S-4', '0195191000', 'Diimpor secara otomatis dari file data-produk.pdf', 85500.00, '', 5, 'aktif', '2026-05-25 23:52:31.321', '2026-05-25 23:52:31.321'),
(168, 'PROMINA BB AYM KMP BRO 120G', '089686540031', 'Diimpor secara otomatis dari file data-produk.pdf', 95000.00, '', 3, 'aktif', '2026-05-25 23:52:31.325', '2026-05-25 23:52:31.325'),
(169, 'PROMINA BC TIM SAPI WORTEL 120G', '0089686530322', 'Diimpor secara otomatis dari file data-produk.pdf', 84500.00, '', 3, 'aktif', '2026-05-25 23:52:31.329', '2026-05-25 23:52:31.329'),
(170, 'RACIK BB IKAN GORENG 20GR', '089686386462', 'Diimpor secara otomatis dari file data-produk.pdf', 54500.00, '', 1, 'aktif', '2026-05-25 23:52:31.333', '2026-05-25 23:52:31.333'),
(171, 'RACIK SAYUR ASEM 33GR', '089686386110', 'Diimpor secara otomatis dari file data-produk.pdf', 40500.00, '', 1, 'aktif', '2026-05-25 23:52:31.337', '2026-05-25 23:52:31.337'),
(172, 'SNACKIT MARSHMALLOW 30GR', '8992942153475', 'Diimpor secara otomatis dari file data-produk.pdf', 34000.00, '', 3, 'aktif', '2026-05-25 23:52:31.341', '2026-05-25 23:52:31.341'),
(173, 'EKONOMI PUTIH EP900K', '8998866608329', 'Diimpor secara otomatis dari file data-produk.pdf', 52500.00, '', 5, 'aktif', '2026-05-25 23:52:31.344', '2026-05-25 23:52:31.344'),
(174, 'RAPIKA LUXURY GOLD 250ML', '8998866611114', 'Diimpor secara otomatis dari file data-produk.pdf', 85500.00, '', 5, 'aktif', '2026-05-25 23:52:31.348', '2026-05-25 23:52:31.348'),
(175, 'RAPIKA COOL BLUE 400ML', '8998866605649', 'Diimpor secara otomatis dari file data-produk.pdf', 84000.00, '', 5, 'aktif', '2026-05-25 23:52:31.353', '2026-05-25 23:52:31.353'),
(176, 'RAPIKA LOVELY LAVENDER 400ML', '8998866603409', 'Diimpor secara otomatis dari file data-produk.pdf', 26500.00, '', 5, 'aktif', '2026-05-25 23:52:31.356', '2026-05-25 23:52:31.356'),
(177, 'DAIA SOFTENER 263G', '8998866608718', 'Diimpor secara otomatis dari file data-produk.pdf', 32500.00, '', 5, 'aktif', '2026-05-25 23:52:31.360', '2026-05-25 23:52:31.360'),
(178, 'SOKLIN SOFTERGEN PINK 770G', '8998866607315', 'Diimpor secara otomatis dari file data-produk.pdf', 62500.00, '', 5, 'aktif', '2026-05-25 23:52:31.364', '2026-05-25 23:52:31.364'),
(179, 'CERELAC BERAS MERAH 120G', '9556001975904', 'Diimpor secara otomatis dari file data-produk.pdf', 5500.00, '', 3, 'aktif', '2026-05-25 23:52:31.369', '2026-05-25 23:52:31.369'),
(180, 'MAMA LIME REFF 800M', '8998866100717', 'Diimpor secara otomatis dari file data-produk.pdf', 47000.00, '', 5, 'aktif', '2026-05-25 23:52:31.372', '2026-05-25 23:52:31.372'),
(181, 'BENDERA PRIMAGRO 1+ COKLAT 360G', '8992753282500', 'Diimpor secara otomatis dari file data-produk.pdf', 69500.00, '', 2, 'aktif', '2026-05-25 23:52:31.376', '2026-05-25 23:52:31.376'),
(182, 'BENDERA PRIMAGRO 3+ MADU 750G', '8992753883707', 'Diimpor secara otomatis dari file data-produk.pdf', 102500.00, '', 2, 'aktif', '2026-05-25 23:52:31.380', '2026-05-25 23:52:31.380'),
(183, 'MAMA LEMON REFF 800M', '8998866100700', 'Diimpor secara otomatis dari file data-produk.pdf', 9000.00, '', 5, 'aktif', '2026-05-25 23:52:31.385', '2026-05-25 23:52:31.385'),
(184, 'LACTOGEN 2 PREBIO 750G', '4800361347631', 'Diimpor secara otomatis dari file data-produk.pdf', 36500.00, '', 2, 'aktif', '2026-05-25 23:52:31.389', '2026-05-25 23:52:31.389'),
(185, 'LACTOGEN 3 VANILA 750G', '8992696520905', 'Diimpor secara otomatis dari file data-produk.pdf', 76500.00, '', 2, 'aktif', '2026-05-25 23:52:31.392', '2026-05-25 23:52:31.392'),
(186, 'PANCI SUSU GG WARNA 16CM', '0191016024', 'Diimpor secara otomatis dari file data-produk.pdf', 27500.00, '', 5, 'aktif', '2026-05-25 23:52:31.396', '2026-05-25 23:52:31.396'),
(187, 'GELAS TAKARAN GREEN LEAF 1831', '8998338118318', 'Diimpor secara otomatis dari file data-produk.pdf', 44000.00, '', 5, 'aktif', '2026-05-25 23:52:31.401', '2026-05-25 23:52:31.401'),
(188, 'TUSUK GIGI ATOZ BOTOL', '8992016235472', 'Diimpor secara otomatis dari file data-produk.pdf', 37000.00, '', 5, 'aktif', '2026-05-25 23:52:31.405', '2026-05-25 23:52:31.405'),
(189, 'SARINGAN TEH PLASTIK TANGGUNG NO8', '0185016003', 'Diimpor secara otomatis dari file data-produk.pdf', 58000.00, '', 5, 'aktif', '2026-05-25 23:52:31.409', '2026-05-25 23:52:31.409'),
(190, 'CYPRUS SENDOK TAKARAN 1395', '8997026920691', 'Diimpor secara otomatis dari file data-produk.pdf', 75500.00, '', 5, 'aktif', '2026-05-25 23:52:31.413', '2026-05-25 23:52:31.413');

-- --------------------------------------------------------

--
-- Table structure for table `promos`
--

CREATE TABLE `promos` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `banner_url` varchar(255) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `sort_order` bigint DEFAULT '1',
  `status` enum('aktif','nonaktif') DEFAULT 'aktif',
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `promos`
--

INSERT INTO `promos` (`id`, `title`, `description`, `banner_url`, `start_date`, `end_date`, `sort_order`, `status`, `created_at`, `updated_at`) VALUES
(2, 'rabu baik', 'rabu baik', 'http://localhost:8080/uploads/img_1779600248524916100.jpg', '2026-05-31', '2026-06-17', 2, 'aktif', '2026-05-23 11:44:43.835', '2026-05-24 12:24:10.328'),
(3, 'Jumat berkah', 'jumat berkahh', 'http://localhost:8080/uploads/img_1779561288458022600.avif', '2026-05-25', '2026-05-31', 1, 'aktif', '2026-05-23 18:05:14.601', '2026-05-26 00:02:31.989'),
(4, 'sabtu seru', 'sabtu seru', 'http://localhost:8080/uploads/img_1779600237572733500.png', '2026-05-26', '2026-06-10', 3, 'aktif', '2026-05-23 18:06:33.822', '2026-05-24 12:26:21.488'),
(5, 'kamis hemat', 'kamis hemat', 'http://localhost:8080/uploads/img_1779600258101480300.jpg', '2026-05-23', '2026-06-05', 5, 'aktif', '2026-05-23 18:08:38.006', '2026-05-24 12:24:19.506'),
(6, 'promo meriah', 'meriaaah', 'http://localhost:8080/uploads/img_1779600361714351600.webp', '2026-05-24', '2026-05-30', 4, 'aktif', '2026-05-24 12:26:11.399', '2026-05-24 12:27:33.311'),
(7, 'promo gratis', 'gratisss', 'http://localhost:8080/uploads/img_1779600408143132000.webp', '2026-05-24', '2026-06-29', 6, 'aktif', '2026-05-24 12:26:59.991', '2026-05-24 12:27:45.777');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_admins_username` (`username`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_products_sku` (`sku`),
  ADD KEY `fk_products_category` (`category_id`);

--
-- Indexes for table `promos`
--
ALTER TABLE `promos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `promos`
--
ALTER TABLE `promos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
