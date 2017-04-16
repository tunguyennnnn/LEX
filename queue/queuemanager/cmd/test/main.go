package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	fmt.Println("JOB_ID:", os.Getenv("JOB_ID"))
	time.Sleep(10)
	fmt.Println("DONE JOB_ID:", os.Getenv("JOB_ID"))
}
