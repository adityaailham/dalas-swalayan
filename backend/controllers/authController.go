package controllers

import (
	"net/http"

	"dalas-swalayan-backend/config"
	"dalas-swalayan-backend/models"
	"dalas-swalayan-backend/middleware"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

// Login memproses autentikasi admin statis untuk saat ini
func Login(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	// Tangkap data yang dikirim dari React
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username dan password wajib diisi!"})
		return
	}

	var admin models.Admin
	if err := config.DB.Where("username = ?", input.Username).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Kredensial salah. Username tidak ditemukan."})
		return
	}

	// Bandingkan password yang dimasukkan dengan hash di database
	if err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Kredensial salah. Password tidak valid."})
		return
	}

	// Buat Token JWT sungguhan
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": admin.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Berlaku 1 hari
	})

	tokenString, err := token.SignedString(middleware.JwtSecretKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat token keamanan"})
		return
	}

	// Sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil!",
		"token":   tokenString,
	})
}
