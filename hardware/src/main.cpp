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


#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#include <TinyGPSPlus.h>

#define TRIG 12
#define ECHO 11

#define RX 17
#define TX 16

#define RGB_PIN 14
#define RGB_COUNT 1

Adafruit_NeoPixel rgb(RGB_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

HardwareSerial gpsSerial(2);
TinyGPSPlus gps;

float distance;
unsigned long duration = 0;

void setup() {
  Serial.begin(115200);
  rgb.begin();
  rgb.show();
  
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  
  gpsSerial.begin(9600, SERIAL_8N1, RX, TX);
  
  digitalWrite(TRIG, LOW);
  delay(1000);
}

void lightIndication(float distance) {
  if (distance > 20)
    rgb.setPixelColor(0, rgb.Color(255, 0, 0));
  else if (distance >= 10 && distance <= 20)
    rgb.setPixelColor(0, rgb.Color(255, 255, 0));
  else if (distance >= 0 && distance <= 10)
    rgb.setPixelColor(0, rgb.Color(0, 255, 0));
  rgb.show();
}

void loop() {
  // 
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  
  duration = pulseIn(ECHO, HIGH);
  
  if (duration >= 38000) {
    Serial.println("Out of range");
  } else {
    distance = duration / 58.0;
    Serial.print(distance);
    Serial.println(" cm");
    lightIndication(distance);
  }
  
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
  
  if (gps.location.isValid()) {
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
    Serial.println("----------------------");
  } else {
    Serial.println("GPS: disconnected");
  }
  
  delay(500);
}