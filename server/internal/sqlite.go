package internal

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

const file string = "timer.db"

func InitDatabase(db *sql.DB) {
	const create string = `
		CREATE TABLE IF NOT EXISTS timer (
			time INTEGER,
			author TEXT,
			description TEXT
		);`
	_, err := db.Exec(create)
	if err != nil {
		panic(err)
	}
}

func GetDatabase() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", file)
	return db, err
}

func insertTimerEntry(db *sql.DB, entry TimerEntry) {
	const insert string = `INSERT INTO timer (time, author, description) VALUES (?, ?, ?);`
	_, err := db.Exec(insert, entry.Time, entry.Author, entry.Description)
	if err != nil {
		panic(err)
	}
}

func getTimerEntries(db *sql.DB) []TimerEntry {

	const selectAll string = `
	SELECT SUM(time), author, description 
	FROM timer 
	GROUP BY author;`
	rows, err := db.Query(selectAll)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var entries []TimerEntry
	for rows.Next() {
		var entry TimerEntry
		err = rows.Scan(&entry.Time, &entry.Author, &entry.Description)
		if err != nil {
			panic(err)
		}
		entries = append(entries, entry)
	}
	return entries
}
