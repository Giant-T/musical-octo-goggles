package api

import (
	"net/http"
	"time"

	"github.com/Giant-T/musical-octo-goggles/schemas"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type createManyTemperaturesDto struct {
	Id           uint      `json:"id" binding:"excluded_with_all"`
	ValueCelsius float32   `json:"value_celsius" binding:"required"`
	Date         time.Time `json:"date" binding:"required"`
}

type PublicController struct {
	Database *gorm.DB
}

// Retourne tous les temperatures contenues dans la base de données.
func (controller *PublicController) GetAllTemperature(context *gin.Context) {
	var temperatures []schemas.Temperature

	controller.Database.
		Order("date desc").
		Find(&temperatures)

	context.JSON(http.StatusOK, temperatures)
}

// Insert une nouvelle temperature dans la base de données.
func (controller *PublicController) CreateTemperature(context *gin.Context) {
	body := schemas.Temperature{}

	if err := context.BindJSON(&body); err != nil {
		context.AbortWithError(http.StatusBadRequest, err)
		return
	}

	controller.Database.Create(&body)
	context.JSON(http.StatusCreated, &body)
}

// Insert plusieurs températures dans la base de données.
func (controller *PublicController) CreateManyTemperatures(context *gin.Context) {
	var body []createManyTemperaturesDto

	if err := context.BindJSON(&body); err != nil {
		context.AbortWithError(http.StatusBadRequest, err)
		return
	}

	controller.Database.Model(&schemas.Temperature{}).Create(&body)
	context.JSON(http.StatusCreated, &body)
}

func (controller *PublicController) InsertIntrusion(context *gin.Context) {
	var json schemas.Intrusion
	controller.Database.Create(&json)
	context.JSON(http.StatusCreated, &json)
}
