package internal

type TimerEntry struct {
	Time        int64  `json:"time"`
	Author      string `json:"author"`
	Description string `json:"description"`
}
