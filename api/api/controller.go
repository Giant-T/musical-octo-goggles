package api

import (
	"net/http"
	"os"

	"github.com/Giant-T/musical-octo-goggles/schemas"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

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
	var body []schemas.Temperature

	if err := context.BindJSON(&body); err != nil {
		context.AbortWithError(http.StatusBadRequest, err)
		return
	}

	if len(body) == 0 {
		return
	}

	controller.Database.Create(&body)
	context.JSON(http.StatusCreated, &body)
}

func (controller *PublicController) InsertIntrusion(context *gin.Context) {
	var json schemas.Intrusion
	controller.Database.Create(&json)
	context.JSON(http.StatusCreated, &json)
}

func (controller *PublicController) GetAllIntrusion(context *gin.Context) {
	var intrusions []schemas.Intrusion

	controller.Database.
		Order("date desc").
		Find(&intrusions)

	context.JSON(http.StatusOK, intrusions)
}

func (controller *PublicController) StopObjet(context *gin.Context) {
	http.Get(os.Getenv("ARDUINO_URL") + "/stop")
	context.JSON(http.StatusOK, true)
}

func (controller *PublicController) DemarrerObjet(context *gin.Context) {
	http.Get(os.Getenv("ARDUINO_URL") + "/demarrer")
	context.JSON(http.StatusOK, true)
}
