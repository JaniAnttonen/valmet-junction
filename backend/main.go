package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"math"
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

func floatCalcMean(numbers []float64) float64 {
	total := 0.0

	for _, v := range numbers {
		total += v
	}

	return math.Round(total / float64(len(numbers)))
}

func intCalcMean(numbers []int64) int64 {
	var total int64

	for _, v := range numbers {
		total += v
	}

	var result int64
	if len(numbers) == 0 {
		result = total / 1
	} else {
		result = total / int64(len(numbers))
	}
	return result
}

func readFile(conn *websocket.Conn) {
	csvfile, err := os.Open("../data/shape/spiral_before.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}
	r := csv.NewReader(csvfile)

	const amountOfCrossSections = 155.0
	const targetAmountOfCrossSections = 20.0
	const amountOfSectors = 360.0
	const targetAmountOfSectors = 36.0

	const crossSectionMultiplier = amountOfCrossSections / targetAmountOfCrossSections
	const sectorMultiplier = amountOfSectors / targetAmountOfSectors

	fmt.Println(crossSectionMultiplier, sectorMultiplier)

	var degs []int64
	var relatives []float64
	var ums []float64

	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		deg, err := strconv.ParseInt(record[0], 10, 64)
		relative, err := strconv.ParseFloat(record[1], 64)
		um, err := strconv.ParseFloat(record[2], 64)

		if float64(len(relatives)) > crossSectionMultiplier || deg == 0 {
			deg = intCalcMean(degs)
			relative = floatCalcMean(relatives)
			um = floatCalcMean(ums)

			fmt.Println(deg, relative, um)

			m := Msg{Deg: deg, Relative: relative, Um: um}

			err = conn.WriteJSON(m)
			if err != nil {
				fmt.Println(err)
			}

			degs = nil
			relatives = nil
			ums = nil

			time.Sleep(100 * time.Millisecond)
		} else {
			degs = append(degs, deg)
			relatives = append(relatives, relative)
			ums = append(ums, um)
		}
	}
}
