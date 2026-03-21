// #include <Arduino.h>
// #include <Adafruit_NeoPixel.h>
// #include <TinyGPSPlus.h>

// #define TRIG 12
// #define ECHO 11

// #define RX 17
// #define TX 16

// //#define RGB_BUILTIN 38

// #define RGB_PIN 14
// #define RGB_COUNT 1


// Adafruit_NeoPixel rgb(RGB_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

// HardwareSerial gpsSerial(2);
// TinyGPSPlus gps;

// float distance;
// float meter;
// unsigned long duration = 0;

// void setup()
// {
//   Serial.begin(115200);


//   rgb.begin();
//   rgb.show();

//   pinMode(TRIG, OUTPUT);
//   pinMode(ECHO, INPUT);

//   gpsSerial.begin(9600, SERIAL_8N1, RX, TX);

//   digitalWrite(TRIG, LOW);
//   delay(1000);
// }

// void lightIndication(float distance)
// {
//   if (distance > 20)
//   {
//       rgb.setPixelColor(0, rgb.Color(255, 0, 0));
//   }
//   else if (distance >= 10 && distance <= 20)
//   {
//     rgb.setPixelColor(0, rgb.Color(255, 255, 0)); 

//   }
//   else if (distance >= 0 && distance <= 10)
//   {
//     rgb.setPixelColor(0, rgb.Color(0, 255, 0));

//   }
//   rgb.show();
// }



// void loop()
// {
//   digitalWrite(TRIG, LOW);
//   delayMicroseconds(2);

//   digitalWrite(TRIG, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG, LOW);

//   duration = pulseIn(ECHO, HIGH);

//   if (duration >= 38000)
//   {
//     Serial.println("Out of range");
//   }
//   else
//   {
//     distance = duration / 58.0;
//     // meter = distance / 100.0;

//     Serial.print(distance);
//     Serial.println(" cm");

//     lightIndication(distance);
//   }

//   while (gpsSerial.available()) {
//     gps.encode(gpsSerial.read());
//   }

//   if (gps.location.isValid()) 
//   {
//     Serial.print("Latitude: ");
//     Serial.println(gps.location.lat(), 6);

//     Serial.print("Longitude: ");
//     Serial.println(gps.location.lng(), 6);

//     Serial.print("Satellites: ");
//     Serial.println(gps.satellites.value());

//     Serial.print("HDOP: ");
//     Serial.println(gps.hdop.value());

//     Serial.println("----------------------");
//   }
//   else
// {
//   Serial.println("GPS: Waiting for fix...");
// }
//   delay(500); 
// }


// #include <Arduino.h>
// #include <Adafruit_NeoPixel.h>
// #include <TinyGPSPlus.h>
// #include <WiFi.h>
// #include <HTTPClient.h>
// // #include <ArduinoJson.h>
// // #include "secrets.h"

// #define TRIG 12
// #define ECHO 11

// #define RX 17
// #define TX 16

// #define RGB_PIN 14
// #define RGB_COUNT 1

// Adafruit_NeoPixel rgb(RGB_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

// HardwareSerial gpsSerial(2);
// TinyGPSPlus gps;

// float distance;
// float binLength = 20;
// unsigned long duration = 0;
// float fillPercentage;
// String status;

// // const char *ssid = NETWORK_NAME;
// // const char *password = NETWORK_PASSWORD;
// // const char *POSTserverURL = BACKEND_URL;
// // const char *deviceToken = DEVICE_TOKEN;

// void setup() 
// {
//   Serial.begin(115200);
//   rgb.begin();
//   rgb.show();
  
//   pinMode(TRIG, OUTPUT);
//   pinMode(ECHO, INPUT);
  
//   gpsSerial.begin(9600, SERIAL_8N1, RX, TX);
  
//   digitalWrite(TRIG, LOW);
//   delay(1000);

//   // WiFi.begin(ssid, password);
//   // Serial.print("Connecting to WiFi");

//   // while (WiFi.status() != WL_CONNECTED)
//   // {
//   //   delay(500);
//   //   Serial.print(".");
//   // }

//   // Serial.println();
//   // Serial.println("Connected to WiFi!");
// }

// void lightIndication(float distance) 
// {

//   if (distance > 20)
//   {
//     rgb.setPixelColor(0, rgb.Color(255, 0, 0));
//   }

//   else if (distance >= 10 && distance <= 20)
//   {
//     rgb.setPixelColor(0, rgb.Color(255, 255, 0));
//   }

//   else if (distance >= 0 && distance <= 10)
//   {
//     rgb.setPixelColor(0, rgb.Color(0, 255, 0));
//   }

//   rgb.show();
// }

// void loop() 
// {
//   digitalWrite(TRIG, LOW);
//   delayMicroseconds(2);
//   digitalWrite(TRIG, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG, LOW);
  
//   duration = pulseIn(ECHO, HIGH);
  
//   if (duration >= 38000) 
//   {
//     Serial.println("Out of range");
//   } 

//   else 
//   {
//     distance = duration / 58.0;
//     Serial.print(distance);
//     Serial.println(" cm");
//     lightIndication(distance);
//   }
  
//   while (gpsSerial.available()) 
//   {
//     gps.encode(gpsSerial.read());
//   }
  
//   if (gps.location.isValid()) 
//   {
//     Serial.print("Latitude: ");
//     Serial.println(gps.location.lat(), 6);
//     Serial.print("Longitude: ");
//     Serial.println(gps.location.lng(), 6);
//     Serial.print("Satellites: ");
//     Serial.println(gps.satellites.value());
//     Serial.println("----------------------");
//   } 

//   else 
//   {
//     Serial.println("GPS: disconnected");
//   }

//   fillPercentage = (distance / binLength) * 100;

//   if(fillPercentage == 0)
//   {
//     status = "EMPTY";
//   }

//   else if(fillPercentage < 30)
//   {
//     status = "LOW";
//   }

//   else if(fillPercentage >= 30 && fillPercentage < 70)
//   {
//     status = "MEDIUM";
//   }

//   else if(fillPercentage >= 70)
//   {
//     status = "FULL";
//   }

//   // if(WiFi.status() == WL_CONNECTED)
//   // {
//   //   HTTPClient http;
//   //   String payload = "{";
//   //   payload += "\"deviceToken\": \"" + String(deviceToken) + "\",";
//   //   payload += "\"location\": \"42.123456,23.456789\",";
//   //   payload += "\"fillPercentage\": " + String(fillPercentage) + ",";
//   //   payload += "\"status\": \"" + status + "\"";
//   //   payload += "}";
//   //   http.begin(POSTserverURL);
//   //   http.addHeader("Content-Type", "application/json");
//   //   int responseCode = http.POST(payload);

//   //   if (responseCode > 0)
//   //   {
//   //     Serial.printf("Data sent at whole minute. HTTP %d\n", responseCode);
//   //   }
//   //   else
//   //   {
//   //     Serial.printf("HTTP error: %s\n", http.errorToString(responseCode).c_str());
//   //   }
//   //   http.end();
//   // }

//   delay(500);
// }

// #include <Arduino.h>
// #include <Adafruit_NeoPixel.h>
// #include <TinyGPSPlus.h>
// #include <WiFi.h>
// #include <HTTPClient.h>
// // #include "secrets.h"

// // ─── Ultrasonic sensor ───────────────────────────────────────
// #define TRIG 12
// #define ECHO 11

// // ─── GPS ─────────────────────────────────────────────────────
// #define RX 17
// #define TX 16

// // ─── NeoPixel ────────────────────────────────────────────────
// #define RGB_PIN   14
// #define RGB_COUNT  1

// // ─── Bin settings ────────────────────────────────────────────
// #define BIN_LENGTH 20.0f   // cm

// // ─── Timing ──────────────────────────────────────────────────
// const unsigned long SENSOR_INTERVAL = 500;
// unsigned long lastSensorRead = 0;

// Adafruit_NeoPixel rgb(RGB_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

// HardwareSerial gpsSerial(2);
// TinyGPSPlus gps;

// float distance      = 0;
// float fillPercentage = 0;
// unsigned long duration = 0;
// String binStatus    = "UNKNOWN";

// // const char *ssid         = NETWORK_NAME;
// // const char *password     = NETWORK_PASSWORD;
// // const char *serverURL    = BACKEND_URL;
// // const char *deviceToken  = DEVICE_TOKEN;

// // ─────────────────────────────────────────────────────────────

// void lightIndication(float dist)
// {
//   if (dist > 20)
//     rgb.setPixelColor(0, rgb.Color(255, 0, 0));   // red   — far / empty
//   else if (dist >= 10)
//     rgb.setPixelColor(0, rgb.Color(255, 255, 0)); // yellow — medium
//   else if (dist >= 0)
//     rgb.setPixelColor(0, rgb.Color(0, 255, 0));   // green  — close / full

//   rgb.show();
// }

// void updateStatus(float fill)
// {
//   if (fill < 1.0f)       binStatus = "EMPTY";
//   else if (fill < 30.0f) binStatus = "LOW";
//   else if (fill < 70.0f) binStatus = "MEDIUM";
//   else                   binStatus = "FULL";
// }

// // ─────────────────────────────────────────────────────────────

// void setup()
// {
//   Serial.begin(115200);

//   rgb.begin();
//   rgb.show();

//   pinMode(TRIG, OUTPUT);
//   pinMode(ECHO, INPUT);
//   digitalWrite(TRIG, LOW);

//   gpsSerial.begin(9600, SERIAL_8N1, RX, TX);

//   delay(1000);

//   // WiFi.begin(ssid, password);
//   // Serial.print("Connecting to WiFi");
//   // while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
//   // Serial.println("\nConnected to WiFi!");
// }

// // ─────────────────────────────────────────────────────────────

// void loop()
// {
//   // GPS се чете при всяка итерация без никакво забавяне,
//   // за да не се губят NMEA изречения в буфера.
//   while (gpsSerial.available())
//     gps.encode(gpsSerial.read());

//   // Останалата логика се изпълнява само на всеки SENSOR_INTERVAL ms.
//   if (millis() - lastSensorRead >= SENSOR_INTERVAL)
//   {
//     lastSensorRead = millis();

//     // ── Ultrasonic measurement ──────────────────────────────
//     digitalWrite(TRIG, LOW);
//     delayMicroseconds(2);
//     digitalWrite(TRIG, HIGH);
//     delayMicroseconds(10);
//     digitalWrite(TRIG, LOW);

//     duration = pulseIn(ECHO, HIGH);

//     if (duration == 0 || duration >= 38000)
//     {
//       Serial.println("Ultrasonic: out of range");
//     }
//     else
//     {
//       distance = duration / 58.0f;
//       Serial.printf("Distance: %.1f cm\n", distance);
//       lightIndication(distance);

//       // Fill percentage — corrected formula:
//       // smaller distance = object closer to sensor = bin more full
//       fillPercentage = constrain(((BIN_LENGTH - distance) / BIN_LENGTH) * 100.0f, 0.0f, 100.0f);
//       updateStatus(fillPercentage);

//       Serial.printf("Fill: %.1f%% — Status: %s\n", fillPercentage, binStatus.c_str());
//     }

//     // ── GPS ────────────────────────────────────────────────
//     if (gps.location.isValid())
//     {
//       Serial.printf("Lat: %.6f  Lon: %.6f  Satellites: %d\n",
//                     gps.location.lat(),
//                     gps.location.lng(),
//                     gps.satellites.value());
//       Serial.println("----------------------");
//     }
//     else
//     {
//       Serial.printf("GPS: waiting for fix — chars processed: %lu\n",
//                     gps.charsProcessed());
//     }

//     // ── HTTP POST (uncomment when WiFi is active) ───────────
//     // if (WiFi.status() == WL_CONNECTED)
//     // {
//     //   HTTPClient http;
//     //   String payload = "{";
//     //   payload += "\"deviceToken\": \""  + String(deviceToken)   + "\",";
//     //   payload += "\"latitude\": "       + String(gps.location.lat(), 6) + ",";
//     //   payload += "\"longitude\": "      + String(gps.location.lng(), 6) + ",";
//     //   payload += "\"fillPercentage\": " + String(fillPercentage) + ",";
//     //   payload += "\"status\": \""       + binStatus              + "\"";
//     //   payload += "}";
//     //
//     //   http.begin(serverURL);
//     //   http.addHeader("Content-Type", "application/json");
//     //   int responseCode = http.POST(payload);
//     //
//     //   if (responseCode > 0)
//     //     Serial.printf("HTTP %d — data sent successfully\n", responseCode);
//     //   else
//     //     Serial.printf("HTTP error: %s\n", http.errorToString(responseCode).c_str());
//     //
//     //   http.end();
//     // }
//   }
// }
/*********
  Rui Santos & Sara Santos - Random Nerd Tutorials
  Complete instructions at https://RandomNerdTutorials.com/esp32-neo-6m-gps-module-arduino/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*********/


#include <Arduino.h> //gps
#include <TinyGPSPlus.h>

#define RXD2 17
#define TXD2 16

HardwareSerial gpsSerial(2);

int baudRates[] = {4800, 9600, 19200, 38400, 57600, 115200};
int numRates = sizeof(baudRates) / sizeof(baudRates[0]);

void setup() {
  Serial.begin(115200);
  delay(2000);
  Serial.println("GPS Baud Rate Tester");
}

void loop() {

  for (int i = 0; i < numRates; i++) {

    int currentBaud = baudRates[i];

    Serial.print("\nTesting baud rate: ");
    Serial.println(currentBaud);

    gpsSerial.end();
    delay(200);

    gpsSerial.begin(currentBaud, SERIAL_8N1, RXD2, TXD2);

    unsigned long startTime = millis();

    while (millis() - startTime < 3000) {
      if (gpsSerial.available()) {

        char c = gpsSerial.read();
        Serial.print(c);

      
        if (c == '$') {
          Serial.println("\nPossible correct baud rate detected!");
        }
      }
    }
  }

  Serial.println("\nTest finished. Restarting...");
  delay(5000);
}
/////////////////////////////////////////////////////////////////

// #include <Arduino.h> //gps ------------------------------------------> Works
// #include <TinyGPSPlus.h>

// #define RXD2 17
// #define TXD2 16
// #define GPS_BAUD 9600

// HardwareSerial gpsSerial(2);

// void setup() {
//   Serial.begin(115200);
//   gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
// }

// void loop() {
//   while (gpsSerial.available()) {
//     char c = gpsSerial.read();
//     Serial.print(c);
//   }
// }


//////////////////////////////
// #include <TinyGPS++.h>

// #define RXD2 17
// #define TXD2 16
// #define GPS_BAUD 9600

// TinyGPSPlus gps;
// HardwareSerial gpsSerial(2);

// void setup() {

//   Serial.begin(115200);
//   gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);

//   Serial.println("GPS started...");
// }

// void loop() {

//   while (gpsSerial.available()) {
//     gps.encode(gpsSerial.read());
//   }

//   if (gps.location.isUpdated()) {

//     Serial.println("------ GPS DATA ------");

//     Serial.print("Latitude: ");
//     Serial.println(gps.location.lat(), 6);

//     Serial.print("Longitude: ");
//     Serial.println(gps.location.lng(), 6);

//     Serial.print("Satellites: ");
//     Serial.println(gps.satellites.value());

//     Serial.print("Speed: ");
//     Serial.print(gps.speed.kmph());
//     Serial.println(" km/h");

//     Serial.print("Altitude: ");
//     Serial.print(gps.altitude.meters());
//     Serial.println(" m");

//     Serial.println("----------------------");
//   }
// }


////////////////

