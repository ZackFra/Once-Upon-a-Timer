package internal

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v3"
	_ "github.com/mattn/go-sqlite3"
)

func NewEntry(db *sql.DB, c fiber.Ctx) error {
	entry := new(TimerEntry)
	if err := c.Bind().Body(&entry); err != nil {
		return c.Status(400).SendString(err.Error())
	}
	log.Printf("Received entry: %v", entry)
	insertTimerEntry(db, *entry)
	return c.SendString("Inserted entry")
}

func GetTimerEntries(db *sql.DB, c fiber.Ctx) error {
	timerEntries := getTimerEntries(db)
	return c.JSON(timerEntries)
}
