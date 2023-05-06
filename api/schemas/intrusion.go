package schemas

import "time"

type Intrusion struct {
	ID   uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Date time.Time `gorm:"autoCreateTime;index;not null" json:"date"`
}
