package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

// UploadFile menangani pengiriman file dari Frontend
func UploadFile(c *gin.Context) {
	// 1. Menerima file dari form pengiriman yang dinamakan "file"
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gagal menerima file. Pastikan Anda mengirimkan file dengan key 'file'."})
		return
	}

	// 2. Membaca ekstensi file (contoh: .jpg, .png)
	ext := filepath.Ext(file.Filename)

	// 3. Pastikan folder "uploads" sudah ada di dalam server, jika belum, buat otomatis!
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", os.ModePerm)
	}

	// 4. MENGHINDARI KONFLIK: Membuat nama unik dari kombinasi Waktu Detik + Ekstensi
	// Contoh jadinya: 1693892391283.png
	newFilename := fmt.Sprintf("img_%d%s", time.Now().UnixNano(), ext)
	
	// Lokasi tujuan penyimpanan di harddisk
	savePath := filepath.Join("uploads", newFilename)

	// 5. Menyalin (Menyimpan) file fisik ke dalam harddisk
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan gambar di harddisk server"})
		return
	}

	// 6. Membuat tautan (URL) yang bisa diakses oleh Frontend
	// Catatan: Port server kita adalah 8080
	fileURL := fmt.Sprintf("http://localhost:8080/uploads/%s", newFilename)

	// 7. Mengembalikan URL tersebut ke React/Next.js
	c.JSON(http.StatusOK, gin.H{
		"message": "Gambar sukses disimpan!",
		"url":     fileURL,
	})
}
