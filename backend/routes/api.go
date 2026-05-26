package routes

import (
	"dalas-swalayan-backend/controllers"
	"dalas-swalayan-backend/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes mengatur semua rute/endpoint aplikasi
func SetupRoutes(router *gin.Engine) {
	
	// 🔓 BUKA KUNCI FOLDER UPLOADS
	// Memerintahkan Golang agar siapa saja yang mengakses URL "/uploads"
	// Boleh melihat isi file statis yang ada di dalam folder "./uploads"
	router.Static("/uploads", "./uploads")

	// Grup Rute Utama
	api := router.Group("/api")
	{

		// 🔐 RUTE AUTHENTIKASI (PUBLIK)
		api.POST("/login", controllers.Login)

		// 🛡️ GRUP RUTE ADMIN (DILINDUNGI MIDDLEWARE)
		admin := api.Group("")
		admin.Use(middleware.AuthMiddleware())
		{
			// Rute POST, PUT, DELETE memerlukan autentikasi
			admin.POST("/categories", controllers.CreateCategory)
			admin.PUT("/categories/:id", controllers.UpdateCategory)
			admin.DELETE("/categories/:id", controllers.DeleteCategory)

			admin.POST("/products", controllers.CreateProduct)
			admin.PUT("/products/:id", controllers.UpdateProduct)
			admin.DELETE("/products/:id", controllers.DeleteProduct)

			admin.POST("/promos", controllers.CreatePromo)
			admin.PUT("/promos/:id", controllers.UpdatePromo)
			admin.DELETE("/promos/:id", controllers.DeletePromo)

			// Rute yang dipakai untuk render dashboard
			admin.GET("/dashboard/stats", controllers.GetDashboardStats)
			admin.POST("/upload", controllers.UploadFile)
		}

		// Rute GET / Baca data biarkan terbuka jika mau (untuk halaman customer toko online nanti)
		// atau bisa kita proteksi di frontend
		api.GET("/categories", controllers.GetAllCategories)
		api.GET("/categories/:id", controllers.GetCategoryByID)
		
		api.GET("/products", controllers.GetAllProducts)
		api.GET("/products/:id", controllers.GetProductByID)
		
		api.GET("/promos", controllers.GetAllPromos)
		api.GET("/promos/:id", controllers.GetPromoByID)
	}
}
