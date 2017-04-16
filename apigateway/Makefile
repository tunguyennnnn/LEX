VERSION := $(shell cat VERSION)
BINARY = apigateway

image:
	docker build -t gcr.io/lexv-159619/$(BINARY):$(VERSION) .
	gcloud docker push gcr.io/lexv-159619/$(BINARY):$(VERSION)
