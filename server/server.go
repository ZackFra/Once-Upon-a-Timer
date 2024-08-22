package main

import (
	"server/internal"

	"github.com/gofiber/fiber/v3"
)

func main() {
	db, err := internal.GetDatabase()
	if err != nil {
		panic(err)
	}
	internal.InitDatabase(db)

	app := fiber.New()

	app.Post("/insert", func(c fiber.Ctx) error {
		return internal.NewEntry(db, c)
	})

	app.Get("/get", func(c fiber.Ctx) error {
		return internal.GetTimerEntries(db, c)
	})

	app.Listen(":5000")
}
