package queuemanager

import (
	"fmt"
	"log"

	"github.com/gocraft/work"
)

type ContextQueue struct {
	Manager *JobManager
}

func (c *ContextQueue) Log(job *work.Job, next work.NextMiddlewareFunc) error {
	log.Println("context", c)
	fmt.Println("Starting job: ", job.Name)
	return next()
}

func (c *ContextQueue) SetManager(job *work.Job, next work.NextMiddlewareFunc) error {
	clientset, err := NewClientSet()
	if err != nil {
		return err
	}
	c.Manager = NewJobManager(clientset, "default")
	return next()
}

func (c *ContextQueue) DoJob(job *work.Job) error {
	log.Println("context", c)
	// Extract arguments:
	id := job.ArgString("id")
	if err := job.ArgError(); err != nil {
		return err
	}

	todo := &Todo{
		JobId:   id,
		JobName: fmt.Sprintf("job-worker-%s", id),
	}

	errc := make(chan error, 1)
	donec := make(chan struct{}, 1)
	job.Checkin(fmt.Sprintf("i=%d", 1))
	log.Println("Doing work", id)
	go c.Manager.Run(todo, "templates/job_resource.tmpl", donec, errc)
	for {
		select {
		case err := <-errc:
			return err
		case <-donec:
			log.Println("Done Work", id)
			return nil
		}
	}

	return nil
}
