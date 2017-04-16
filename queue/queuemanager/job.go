package queuemanager

import (
	"bytes"
	"encoding/json"
	"html/template"
	"log"

	"github.com/ghodss/yaml"

	batchv1 "k8s.io/client-go/pkg/apis/batch/v1"
)

type Todo struct {
	JobId   string
	JobName string
}

func render(todo *Todo, tmplFileName string) (buf bytes.Buffer, err error) {
	t := template.Must(template.New("job_resource.tmpl").ParseFiles(tmplFileName))
	if err = t.Execute(&buf, todo); err != nil {
		log.Println("Template Execute Error:", err)
		return buf, err
	}
	return buf, nil
}

func serialize(todo *Todo, tmplFileName string) (ret *batchv1.Job, err error) {
	ret = new(batchv1.Job)
	buf, err := render(todo, tmplFileName)
	if err != nil {
		return nil, err
	}
	data, err := yaml.YAMLToJSON(buf.Bytes())
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(data, ret)
	return ret, err
}
