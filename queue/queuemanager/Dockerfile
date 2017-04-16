FROM alpine:latest
RUN apk add --update ca-certificates
ADD templates/ /templates/
ADD queue-manager /queue-manager
CMD ["/queue-manager"]
