package main

import (
	"log"
	"os"
	"time"

	"dalas-swalayan-backend/config" // Paket config yang barusan kita buat
	"dalas-swalayan-backend/routes" // Paket pengatur alamat API

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Muat pengaturan dari file .env
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ Peringatan: Tidak dapat menemukan file .env, menggunakan pengaturan default")
	}

	// 2. Hubungkan ke Database MySQL (Sudah dihidupkan)
	config.ConnectDatabase()

	// 3. Inisialisasi Kerangka Kerja Gin
	r := gin.Default()

	// 4. Atur CORS yang mengizinkan Authorization Header
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	// 5. Tes Rute sederhana untuk mengecek apakah server jalan
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "success",
			"message": "🚀 Server Dalas Swalayan berhasil berjalan!",
		})
	})

	// 6. Daftarkan Semua Rute Utama (Controller)
	routes.SetupRoutes(r)

	// 7. Jalankan Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Menjalankan API Server di port :" + port)
	r.Run(":" + port)
}
