package models

import "time"

type Category struct {
	// GORM akan otomatis menganggap "ID" sebagai Primary Key dengan Auto Increment
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"type:varchar(100);not null" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Icon        string    `gorm:"type:varchar(50)" json:"icon"` // Menyimpan identitas icon
	ImageUrl    string    `gorm:"type:text" json:"image_url"`   // Menyimpan link gambar asli
	
	// Fitur bawaan GORM untuk otomatis mencatat waktu kapan data dibuat dan diperbarui
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
