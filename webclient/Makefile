VERSION := $(shell cat VERSION)
BINARY = webclient

all: $(BINARY)

$(BINARY):
	npm run build

image: $(BINARY)
	docker build -t gcr.io/lexv-159619/$(BINARY):$(VERSION) .
	gcloud docker push gcr.io/lexv-159619/$(BINARY):$(VERSION)

clean:
	rm -rf dist/
