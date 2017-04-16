package queuemanager

import (
	"log"
	"time"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/pkg/api/v1"
	batchv1 "k8s.io/client-go/pkg/apis/batch/v1"
	"k8s.io/client-go/pkg/watch"
)

type JobManager struct {
	client *kubernetes.Clientset
	ns     string
}

func NewJobManager(c *kubernetes.Clientset, namespace string) *JobManager {
	return &JobManager{
		client: c,
		ns:     namespace,
	}
}

func (m *JobManager) Create(j *batchv1.Job) (*batchv1.Job, error) {
	return m.client.BatchV1Client.Jobs(m.ns).Create(j)
}

func (m *JobManager) List() (*batchv1.JobList, error) {
	jobs, err := m.client.BatchV1Client.Jobs(m.ns).List(v1.ListOptions{})
	log.Printf("Jobs: %v\n", jobs)
	return jobs, err
}

func (m *JobManager) Watch() (watch.Interface, error) {
	return m.client.BatchV1Client.Jobs(m.ns).Watch(v1.ListOptions{Watch: true})
}

func (m *JobManager) UpdateStatus(j *batchv1.Job) (*batchv1.Job, error) {
	return m.client.BatchV1Client.Jobs(m.ns).UpdateStatus(j)
}

func (m *JobManager) Run(todo *Todo, resourceFileName string, done chan struct{}, errc chan error) {
	log.Printf("Running job using file: %s\n", resourceFileName)
	j, err := serialize(todo, resourceFileName)
	if err != nil {
		log.Println("Serializing Job error:", err)
		errc <- err
		return
	}
	job, err := m.Create(j)
	if err != nil {
		log.Println("Create Job error:", err)
		errc <- err
		return
	}
	log.Println("K8S Job Created")
	watchI, err := m.Watch()
	if err != nil {
		log.Println("Watch Job error:", err)
		errc <- err
		return
	}
	log.Println("K8S Watcher:", watchI)
	watcher := watchI.ResultChan()
	for {
		select {
		case event := <-watcher:
			log.Println(event)
		case <-time.After(5 * time.Second):
			job, err := m.UpdateStatus(job)
			if err != nil {
				log.Println("Update Status Job error:", err)
				errc <- err
				return
			}
			log.Println(job)
			if job.Status.Succeeded > 0 {
				done <- struct{}{}
				return
			}
		}
	}
}
