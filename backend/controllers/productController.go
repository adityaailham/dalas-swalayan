package controllers

import (
	"net/http"
	"strconv"
	"time"

	"dalas-swalayan-backend/config"
	"dalas-swalayan-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllProducts mengambil semua data produk beserta info Kategorinya
func GetAllProducts(c *gin.Context) {
	var products []models.Product
	
	searchQuery := c.Query("search")
	categoryID := c.Query("category")
	status := c.Query("status")

	// Base query HANYA untuk filtering (sebelum preload, limit, offset)
	baseQuery := config.DB.Model(&models.Product{})

	if searchQuery != "" {
		baseQuery = baseQuery.Where("name LIKE ?", "%"+searchQuery+"%")
	}
	if categoryID != "" {
		baseQuery = baseQuery.Where("category_id = ?", categoryID)
	}
	if status != "" {
		baseQuery = baseQuery.Where("status = ?", status)
	}

	// Tangkap parameter query pagination
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "10")
	page, _ := strconv.Atoi(pageStr)
	limit, _ := strconv.Atoi(limitStr)
	if page < 1 { page = 1 }
	if limit < 1 { limit = 10 }
	offset := (page - 1) * limit

	var totalItems int64
	baseQuery.Count(&totalItems)

	// Terapkan Preload, Limit dan Offset pada pencarian akhir
	result := baseQuery.Preload("Category").Limit(limit).Offset(offset).Find(&products)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data produk"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": products,
		"meta": gin.H{
			"total_items": totalItems,
			"page":        page,
			"limit":       limit,
		},
	})
}

// CreateProduct menambahkan produk baru ke database
func CreateProduct(c *gin.Context) {
	var input struct {
		Name        string  `json:"name" binding:"required"`
		SKU         string  `json:"sku"`
		Description string  `json:"description"`
		Price       float64 `json:"price" binding:"required"`
		CategoryID  uint    `json:"category_id" binding:"required"`
		ImageURL    string  `json:"image_url"`
		Status      string  `json:"status"`
	}

	// Validasi input dari Frontend
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid. Pastikan nama, harga, dan kategori terisi!"})
		return
	}

	// Default status
	status := input.Status
	if status == "" {
		status = "aktif"
	}

	// Tangani masalah duplikat SKU jika pengguna membiarkannya kosong
	sku := input.SKU
	if sku == "" {
		// Buat SKU acak berdasarkan waktu saat ini agar selalu unik
		sku = "PRD-" + time.Now().Format("20060102150405")
	}

	product := models.Product{
		Name:        input.Name,
		SKU:         sku,
		Description: input.Description,
		Price:       input.Price,
		CategoryID:  input.CategoryID,
		ImageURL:    input.ImageURL,
		Status:      status,
	}

	if err := config.DB.Create(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan produk ke database"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Produk berhasil ditambahkan!",
		"data":    product,
	})
}

// GetProductByID mengambil 1 produk berdasarkan ID
func GetProductByID(c *gin.Context) {
	id := c.Param("id")
	var product models.Product

	if err := config.DB.Preload("Category").First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Produk tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": product})
}

// UpdateProduct mengubah data produk
func UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product

	if err := config.DB.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Produk tidak ditemukan"})
		return
	}

	var input struct {
		Name        string  `json:"name"`
		SKU         string  `json:"sku"`
		Description string  `json:"description"`
		Price       float64 `json:"price"`
		CategoryID  uint    `json:"category_id"`
		ImageURL    string  `json:"image_url"`
		Status      string  `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}

	config.DB.Model(&product).Updates(models.Product{
		Name:        input.Name,
		SKU:         input.SKU,
		Description: input.Description,
		Price:       input.Price,
		CategoryID:  input.CategoryID,
		ImageURL:    input.ImageURL,
		Status:      input.Status,
	})

	// Tarik data ulang untuk menyertakan kategori
	config.DB.Preload("Category").First(&product, id)

	c.JSON(http.StatusOK, gin.H{
		"message": "Produk berhasil diperbarui",
		"data":    product,
	})
}

// DeleteProduct menghapus produk dari database
func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product

	if err := config.DB.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Produk tidak ditemukan"})
		return
	}

	config.DB.Delete(&product)
	c.JSON(http.StatusOK, gin.H{"message": "Produk berhasil dihapus"})
}
