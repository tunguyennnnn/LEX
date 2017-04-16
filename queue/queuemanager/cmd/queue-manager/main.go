package main

import (
	"os"
	"os/signal"

	"github.com/garyburd/redigo/redis"
	"github.com/gocraft/work"
	"github.com/lex/queuemanager"
)

var redisPool = &redis.Pool{
	MaxActive: 5,
	MaxIdle:   5,
	Wait:      true,
	Dial: func() (redis.Conn, error) {
		return redis.Dial("tcp", "redis:6379")
	},
}

func main() {
	// Make a new pool. Arguments:
	// Context{} is a struct that will be the context for the request.
	// 10 is the max concurrency
	// "work" is the Redis namespace
	// redisPool is a Redis pool
	pool := work.NewWorkerPool(queuemanager.ContextQueue{}, 5, "work", redisPool)

	// Add middleware that will be executed for each job
	pool.Middleware((*queuemanager.ContextQueue).Log)
	pool.Middleware((*queuemanager.ContextQueue).SetManager)

	// Map the name of jobs to handler functions
	pool.Job("job", (*queuemanager.ContextQueue).DoJob)

	// Customize options:
	// pool.JobWithOptions("export", work.JobOptions{Priority: 10, MaxFails: 1}, (*Context).Export)

	// Start processing jobs
	pool.Start()

	// Wait for a signal to quit:
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt, os.Kill)
	<-signalChan

	// Stop the pool
	pool.Stop()
}
