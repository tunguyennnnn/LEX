FROM alpine:latest
RUN apk add --update ca-certificates
ADD queue-client /queue-client
CMD ["./queue-client", "-redis=redis://redis:6379", "-ns=work", "-listen=0.0.0.0:5040"]
