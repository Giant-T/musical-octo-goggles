package api

import (
	"net/http"
	"time"

	"github.com/Giant-T/musical-octo-goggles/schemas"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type createManyDto struct {
  Id           uint `json:"id" `
	ValueCelsius float32   `json:"value_celsius" binding:"required"`
	Date         time.Time `json:"date" binding:"required"`
}

type PublicController struct {
	Database *gorm.DB
}

func (controller *PublicController) GetAllTemperature(context *gin.Context) {
	var temperatures []schemas.Temperature

	controller.Database.
		Order("date desc").
		Find(&temperatures)

	context.JSON(http.StatusOK, temperatures)
}

func (controller *PublicController) CreateTemperature(context *gin.Context) {
	body := schemas.Temperature{}

	if err := context.BindJSON(&body); err != nil {
		context.AbortWithError(http.StatusBadRequest, err)
		return
	}

	controller.Database.Create(&body)
	context.JSON(http.StatusCreated, &body)
}

func (controller *PublicController) CreateManyTemperatures(context *gin.Context) {
	var body []createManyDto

	if err := context.BindJSON(&body); err != nil {
		context.AbortWithError(http.StatusBadRequest, err)
		return
	}

	controller.Database.Model(&schemas.Temperature{}).Create(&body)
	context.JSON(http.StatusCreated, &body)
}
