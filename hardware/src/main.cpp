#include <Arduino.h>

#define TXD2 43
#define RXD2 44

#define GPS_BAUD 9600

HardwareSerial gpsSerial(2);

void setup(){
  Serial.begin(115200);
  
  gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
  Serial.println("Serial 2 started at 9600 baud rate");
}

void loop(){
  while (gpsSerial.available() > 0){
    char gpsData = gpsSerial.read();
    Serial.print(gpsData);
  }
  delay(1000);
  Serial.println("-------------------------------");
}