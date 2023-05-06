package main

import (
	"os"

	"github.com/Giant-T/musical-octo-goggles/api"
	"github.com/Giant-T/musical-octo-goggles/schemas"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load()

	println("Debut du programme!")

	println("Connection a la base de donnees...")
	dns := os.Getenv("DATABASE_URL")
	controller := api.PublicController{}
	var err error
	controller.Database, err = gorm.Open(mysql.Open(dns), &gorm.Config{})

	if err != nil {
		panic("Impossible d'acceder a la base de donnees.")
	}

	println("Migration de la base de donnees...")
	err = controller.Database.AutoMigrate(&schemas.Temperature{}, &schemas.Intrusion{})

	if err != nil {
		panic("Impossible de faire la migration de la base de donnees.")
	}

	println("Demarrage du serveur http sur le port 8080")

	server := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true

	server.Use(cors.New(config))

	// Definition des routes
	server.GET("/temperature/all", controller.GetAllTemperature)
	server.POST("/temperature", controller.CreateTemperature)
	server.POST("/temperature/many", controller.CreateManyTemperatures)
	server.POST("/intrusion", controller.InsertIntrusion)

	err = server.Run(":8080")

	if err != nil {
		panic("Impossible de demarrer le serveur http.")
	}
}
