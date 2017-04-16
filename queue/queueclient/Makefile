VERSION := $(shell cat VERSION)
BINARY = queue-client
DEPS := $(shell find . -type f -iname '*.go' | egrep -v _test.g-o$)
TESTS := $(shell find . -type f -iname *_test.go)

all: $(BINARY)

$(BINARY): $(DEPS)
	go generate github.com/lex/queueclient/internal/assets
	CGO_ENABLED=0 GOOS=linux go build -a -tags netgo -ldflags '-w' -o $(BINARY) cmd/$(BINARY)/main.go

image: $(BINARY)
	docker build -t gcr.io/lexv-159619/$(BINARY):$(VERSION) .
	gcloud docker push gcr.io/lexv-159619/$(BINARY):$(VERSION)

test: $(TESTS)
	go test ./...

clean:
	rm -f $(BINARY)
