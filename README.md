# Timer App

This app was built as an example for [this](https://hakt.tech/blog/2024-08-22) blog post. It was created to demonstrate how complicated creating a client-side timer can get.

The back-end is written in Go and is located in the server folder. It exists primarily to pipe requests to a SQLite database. It was build using Fiber, and uses the Go SQLite3 package to handle database interactions. On startup it will attempt to access or create the timer.db database file. It will then create a timer entries table to store the entries.

The front-end is located in the client folder. It's built in React with Next.js as the framework with Tailwind for style. The Timer component displays out the formatted time, and provides a pause and save button to pause the timer and commit the current time to the database. It uses the `useTimer` custom hook located in the hooks folder to track the time.

The Dashboard component displays out the sum of all timer entries, grouped by author.