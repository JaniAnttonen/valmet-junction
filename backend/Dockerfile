FROM golang:alpine AS build

RUN apk update && apk add git

RUN adduser -D -g '' apiuser

RUN mkdir -p /go/src/valmet-backend
COPY . /go/src/valmet-backend

ENV GOPATH /go:$GOPATH
ENV PATH /go/bin:$PATH

WORKDIR /go/src/valmet-backend

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/valmet-backend

FROM scratch

COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /go/bin/valmet-backend /go/bin/valmet-backend

USER apiuser

CMD ["/go/bin/valmet-backend"]
