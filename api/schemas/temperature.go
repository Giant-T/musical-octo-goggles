package schemas

import "time"

type Temperature struct {
  ID           uint `gorm:"primaryKey;autoIncrement" json:"id"`
  ValueCelsius float32 `gorm:"not null" json:"value_celsius"`
  Date         time.Time `gorm:"autoCreateTime;index;not null" json:"date"`
}
