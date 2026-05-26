package controllers

import (
	"net/http"

	"dalas-swalayan-backend/config"
	"dalas-swalayan-backend/models"

	"github.com/gin-gonic/gin"
)

func GetDashboardStats(c *gin.Context) {
	var totalProducts int64
	var activeProducts int64
	var totalCategories int64
	var activePromos int64

	// Hitung total produk
	config.DB.Model(&models.Product{}).Count(&totalProducts)
	
	// Hitung produk berstatus 'aktif'
	config.DB.Model(&models.Product{}).Where("status = ?", "aktif").Count(&activeProducts)
	
	// Hitung total kategori
	config.DB.Model(&models.Category{}).Count(&totalCategories)

	// Hitung promo berstatus 'aktif'
	config.DB.Model(&models.Promo{}).Where("status = ?", "aktif").Count(&activePromos)

	c.JSON(http.StatusOK, gin.H{
		"data": gin.H{
			"total_products":     totalProducts,
			"active_products":    activeProducts,
			"total_categories":   totalCategories,
			"active_promos":      activePromos,
		},
	})
}
