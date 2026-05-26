package config

import (
	"fmt"
	"log"
	"os"

	"dalas-swalayan-backend/models" // Import model agar bisa dibaca GORM

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// DB adalah variabel global (Public) agar bisa dipanggil dari Controllers
var DB *gorm.DB

func ConnectDatabase() {
	// 1. Ambil data konfigurasi dari file .env
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// 2. Susun URL koneksi ke MySQL (DSN - Data Source Name)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbPort, dbName)

	// 3. Lakukan koneksi menggunakan GORM
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Gagal terhubung ke database:", err)
	}

	// 4. AutoMigrate: GORM akan membaca struct di "models" lalu membuatkan tabelnya otomatis
	log.Println("Memeriksa dan membuat tabel database...")
	err = database.AutoMigrate(&models.Category{}, &models.Product{}, &models.Promo{}, &models.Admin{})
	if err != nil {
		log.Fatal("❌ Gagal membuat tabel otomatis:", err)
	}

	// 5. Simpan koneksi ke variabel global
	DB = database

	// 6. Seeding Admin Awal jika tabel kosong
	var count int64
	DB.Model(&models.Admin{}).Count(&count)
	if count == 0 {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
		admin := models.Admin{
			Username: "admin",
			Password: string(hashedPassword),
		}
		DB.Create(&admin)
		log.Println("🌱 Seeding: Akun Admin default (admin/admin) telah dibuat!")
	}

	log.Println("✅ Berhasil terhubung ke database MySQL!")
}
