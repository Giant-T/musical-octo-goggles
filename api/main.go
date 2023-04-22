package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Temperature struct {
	ID    uint `gorm:"primaryKey;autoIncrement"`
	ValueCelsius float32
	Date  time.Time `gorm:"autoCreateTime"`
}

func main() {
	println("Debut du programme!")

	println("Connection a la base de donnees...")
	dns := "root:mysql@tcp(127.0.0.1:3306)/testobj?charset=utf8&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dns), &gorm.Config{})

	if err != nil {
		panic("Impossible d'acceder a la base de donnees.")
	}

	println("Migration de la base de donnees...")
	err = db.AutoMigrate(&Temperature{})

	if err != nil {
		panic("Impossible de faire la migration de la base de donnees.")
	}

	println("Demarrage du serveur http sur le port 8080")

	server := gin.Default()

	server.GET("/temperature/all", func(c *gin.Context) {
		var temperatures []Temperature
        db.Find(&temperatures)
		c.JSON(http.StatusOK, temperatures)
	})
	server.POST("/temperature", func(c *gin.Context) {
        body := Temperature{}

        if err := c.BindJSON(&body); err != nil {
            c.AbortWithError(http.StatusBadRequest, err)
            return
        }

        db.Create(&body)
        c.JSON(http.StatusCreated, &body)
	})

	err = server.Run()

	if err != nil {
		panic("Impossible de demarrer le serveur http.")
	}
}
