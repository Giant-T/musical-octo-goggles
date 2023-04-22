package main

import (
	"github.com/Giant-T/musical-octo-goggles/api"
	"github.com/Giant-T/musical-octo-goggles/schemas"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	println("Debut du programme!")

	println("Connection a la base de donnees...")
	dns := "root:mysql@tcp(127.0.0.1:3306)/testobj?charset=utf8&parseTime=True&loc=Local"
	controller := api.PublicController{}
	var err error
	controller.Database, err = gorm.Open(mysql.Open(dns), &gorm.Config{})

	if err != nil {
		panic("Impossible d'acceder a la base de donnees.")
	}

	println("Migration de la base de donnees...")
	err = controller.Database.AutoMigrate(&schemas.Temperature{})

	if err != nil {
		panic("Impossible de faire la migration de la base de donnees.")
	}

	println("Demarrage du serveur http sur le port 8080")

	server := gin.Default()

  // Definition des routes
	server.GET("/temperature/all", controller.GetAllTemperature)
	server.POST("/temperature", controller.CreateTemperature)
	server.POST("/temperature/many", controller.CreateManyTemperatures)

  err = server.Run(":8080")

	if err != nil {
		panic("Impossible de demarrer le serveur http.")
	}
}
