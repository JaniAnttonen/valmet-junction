package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

type Msg struct {
	Deg      int64
	Relative float64
	Um       float64
}

func main() {
	http.HandleFunc("/live", wsHandler)
	panic(http.ListenAndServe(":8080", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r, w.Header(), 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}
	go readFile(conn)
}

func readFile(conn *websocket.Conn) {
	csvfile, err := os.Open("../data/shape/spiral_before.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}
	r := csv.NewReader(csvfile)

	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		deg, err := strconv.ParseInt(record[0], 10, 32)
		relative, err := strconv.ParseFloat(record[1], 64)
		um, err := strconv.ParseFloat(record[2], 64)
		m := Msg{Deg: deg, Relative: relative, Um: um}

		err = conn.WriteJSON(m)
		if err != nil {
			fmt.Println(err)
		}

		time.Sleep(50 * time.Millisecond)
	}
}
