package models

import "time"

type Product struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"type:varchar(255);not null" json:"name"`
	SKU         string    `gorm:"type:varchar(100);uniqueIndex" json:"sku"`
	Description string    `gorm:"type:text" json:"description"`
	Price       float64   `gorm:"type:decimal(10,2);not null" json:"price"`
	ImageURL    string    `gorm:"type:varchar(255)" json:"image_url"`
	
	// Foreign key: Menghubungkan produk ini dengan tabel Kategori
	CategoryID  uint      `json:"category_id"`
	
	Status      string    `gorm:"type:enum('aktif','nonaktif');default:'aktif'" json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	// Relasi ke tabel Category (agar saat menarik produk, nama kategorinya otomatis ikut terbawa)
	Category Category `gorm:"foreignKey:CategoryID" json:"category"`
}
