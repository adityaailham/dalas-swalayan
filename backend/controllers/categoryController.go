package controllers

import (
	"net/http"
	"strconv"

	"dalas-swalayan-backend/config"
	"dalas-swalayan-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllCategories mengambil semua data kategori dari database
func GetAllCategories(c *gin.Context) {
	// Siapkan variabel berupa "Array/List" dari model Category
	var categories []models.Category

	// Tangkap parameter query
	searchQuery := c.Query("search")
	sortOrder := c.Query("sort") // "asc" atau "desc"

	query := config.DB.Model(&models.Category{})

	// Filter pencarian
	if searchQuery != "" {
		query = query.Where("name LIKE ?", "%"+searchQuery+"%")
	}

	// Pengurutan berdasarkan nama
	if sortOrder == "desc" {
		query = query.Order("name desc")
	} else {
		query = query.Order("name asc") // Default asc
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
	query.Count(&totalItems)

	// GORM otomatis menjalankan eksekusi
	result := query.Limit(limit).Offset(offset).Find(&categories)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data kategori"})
		return
	}

	// Jika sukses, kembalikan data dalam format JSON ke Frontend
	c.JSON(http.StatusOK, gin.H{
		"data": categories,
		"meta": gin.H{
			"total_items": totalItems,
			"page":        page,
			"limit":       limit,
		},
	})
}

// CreateCategory menambahkan satu kategori baru
func CreateCategory(c *gin.Context) {
	// Struct sementara untuk menangkap kiriman JSON dari Frontend
	var input struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Icon        string `json:"icon"`
		ImageUrl    string `json:"image_url"`
	}

	// Ambil data kiriman dari body Request (Frontend Next.js)
	if err := c.ShouldBindJSON(&input); err != nil {
		// Jika frontend tidak mengirim nama, akan memunculkan error 400 Bad Request
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nama kategori wajib diisi!"})
		return
	}

	// Bentuk ke model asli Kategori
	category := models.Category{
		Name:        input.Name,
		Description: input.Description,
		Icon:        input.Icon,
		ImageUrl:    input.ImageUrl,
	}

	// GORM otomatis menjalankan perintah "INSERT INTO categories (...)"
	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan kategori ke database"})
		return
	}

	// Kirim respon berhasil (Status 201 Created)
	c.JSON(http.StatusCreated, gin.H{
		"message": "Kategori berhasil ditambahkan!",
		"data":    category,
	})
}

// GetCategoryByID mengambil 1 data kategori berdasarkan ID
func GetCategoryByID(c *gin.Context) {
	id := c.Param("id")
	var category models.Category

	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Kategori tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}

// UpdateCategory mengubah data kategori
func UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category

	// Cari kategori berdasarkan ID
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Kategori tidak ditemukan"})
		return
	}

	var input struct {
		Name        string `json:"name"`
		Description string `json:"description"`
		Icon        string `json:"icon"`
		ImageUrl    string `json:"image_url"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format input tidak valid"})
		return
	}

	// Update record
	config.DB.Model(&category).Updates(models.Category{
		Name:        input.Name,
		Description: input.Description,
		Icon:        input.Icon,
		ImageUrl:    input.ImageUrl,
	})

	c.JSON(http.StatusOK, gin.H{
		"message": "Kategori berhasil diperbarui",
		"data":    category,
	})
}

// DeleteCategory menghapus kategori
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category

	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Kategori tidak ditemukan"})
		return
	}

	config.DB.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Kategori berhasil dihapus"})
}
