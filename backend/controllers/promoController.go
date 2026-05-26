package controllers

import (
	"net/http"
	"strconv"
	"time"

	"dalas-swalayan-backend/config"
	"dalas-swalayan-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllPromos mengambil semua data promo
func GetAllPromos(c *gin.Context) {
	var promos []models.Promo
	
	searchQuery := c.Query("search")
	status := c.Query("status")

	query := config.DB.Model(&models.Promo{})

	if searchQuery != "" {
		query = query.Where("title LIKE ?", "%"+searchQuery+"%")
	}

	if status != "" {
		query = query.Where("status = ?", status)
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

	// Tampilkan berdasarkan sort_order untuk kerapian urutan banner
	result := query.Order("sort_order asc").Limit(limit).Offset(offset).Find(&promos)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data promo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": promos,
		"meta": gin.H{
			"total_items": totalItems,
			"page":        page,
			"limit":       limit,
		},
	})
}

// CreatePromo menambahkan satu promo baru
func CreatePromo(c *gin.Context) {
	var input struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
		StartDate   string `json:"start_date" binding:"required"` // Dari frontend berwujud string YYYY-MM-DD
		EndDate     string `json:"end_date" binding:"required"`
		BannerURL   string `json:"banner_url"`
		SortOrder   int    `json:"sort_order"`
		Status      string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format input tidak valid. Pastikan judul dan tanggal terisi."})
		return
	}

	// Parsing string tanggal "YYYY-MM-DD" menjadi tipe Time asli Golang
	layoutFormat := "2006-01-02" // Di Golang, 2006-01-02 adalah kode ajaib (aturan baku) untuk format YYYY-MM-DD
	startDate, err1 := time.Parse(layoutFormat, input.StartDate)
	endDate, err2 := time.Parse(layoutFormat, input.EndDate)

	if err1 != nil || err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format tanggal salah. Gunakan YYYY-MM-DD."})
		return
	}

	// Status bawaan jika kosong
	status := input.Status
	if status == "" {
		status = "aktif"
	}

	// Bentuk model Promo
	promo := models.Promo{
		Title:       input.Title,
		Description: input.Description,
		StartDate:   startDate,
		EndDate:     endDate,
		BannerURL:   input.BannerURL,
		SortOrder:   input.SortOrder,
		Status:      status,
	}

	if err := config.DB.Create(&promo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan promo ke database"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Promo berhasil ditambahkan!",
		"data":    promo,
	})
}

// GetPromoByID mengambil 1 promo berdasarkan ID
func GetPromoByID(c *gin.Context) {
	id := c.Param("id")
	var promo models.Promo
	if err := config.DB.First(&promo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Promo tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": promo})
}

// UpdatePromo mengubah data promo
func UpdatePromo(c *gin.Context) {
	id := c.Param("id")
	var promo models.Promo

	if err := config.DB.First(&promo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Promo tidak ditemukan"})
		return
	}

	var input struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		StartDate   string `json:"start_date"`
		EndDate     string `json:"end_date"`
		BannerURL   string `json:"banner_url"`
		SortOrder   int    `json:"sort_order"`
		Status      string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format input tidak valid"})
		return
	}

	layoutFormat := "2006-01-02"
	startDate, _ := time.Parse(layoutFormat, input.StartDate)
	endDate, _ := time.Parse(layoutFormat, input.EndDate)

	config.DB.Model(&promo).Updates(models.Promo{
		Title:       input.Title,
		Description: input.Description,
		StartDate:   startDate,
		EndDate:     endDate,
		BannerURL:   input.BannerURL,
		SortOrder:   input.SortOrder,
		Status:      input.Status,
	})

	c.JSON(http.StatusOK, gin.H{
		"message": "Promo berhasil diupdate",
		"data":    promo,
	})
}

// DeletePromo menghapus promo dari database
func DeletePromo(c *gin.Context) {
	id := c.Param("id")
	var promo models.Promo

	if err := config.DB.First(&promo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Promo tidak ditemukan"})
		return
	}

	config.DB.Delete(&promo)
	c.JSON(http.StatusOK, gin.H{"message": "Promo berhasil dihapus"})
}
