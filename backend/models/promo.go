package models

import "time"

type Promo struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title"`
	Description string    `gorm:"type:text" json:"description"`
	BannerURL   string    `gorm:"type:varchar(255)" json:"banner_url"`
	
	// Tanggal mulai dan selesai promo berformat khusus DATE
	StartDate   time.Time `gorm:"type:date;not null" json:"start_date"`
	EndDate     time.Time `gorm:"type:date;not null" json:"end_date"`
	
	SortOrder   int       `gorm:"type:int;default:1" json:"sort_order"`
	Status      string    `gorm:"type:enum('aktif','nonaktif');default:'aktif'" json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
