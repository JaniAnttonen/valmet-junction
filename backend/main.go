package main

import (
	"encoding/csv"
	"io"
	"log"
	"net"
	"os"
	"time"
)

func main() {
	csvfile, err := os.Open("../data/shape/spiral_before.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}

	r := csv.NewReader(csvfile)

	tcpAddr, err := net.ResolveTCPAddr(resolver, serverAddr)
	if err != nil {
		panic(err)
	}

	listener, err := net.ListenTCP("tcp", tcpAddr)
	if err != nil {
		panic(err)
	}

	// listen for an incoming connection
	conn, err := listener.Accept()
	if err != nil {
		panic(err)
	}

	// receive message
	buf := make([]byte, 512)
	n, err := conn.Read(buf[0:])
	if err != nil {
		panic(err)
	}

	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		// send message
		if _, err := conn.Write(); err != nil {
			panic(err)
		}
		println(record)
		time.Sleep(100 * time.Millisecond)
	}
}
