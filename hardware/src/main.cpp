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
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include "secrets.h"

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
float binLength = 20;
unsigned long duration = 0;
long fillPercentage;
String status;

const char *ssid = NETWORK_NAME;
const char *password = NETWORK_PASSWORD;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setupWiFi() 
{
    delay(10);
    Serial.println();
    Serial.print("Connecting to WiFi: ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

void reconnectMqtt() 
{

    while (!mqttClient.connected()) 
    {
        Serial.print("Attempting MQTT connection...");

        if (mqttClient.connect(MQTT_CLIENT_ID)) 
        {
            Serial.println("connected to MQTT broker!");
        } 

        else 
        {
            Serial.print("failed, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }

    }
}

void publishTelemetry() {
    String registeredLocation = "Drujba";
    String coordinateStr = "42.23";

    String payload = status + "," + registeredLocation + "," + coordinateStr;

    String topic = String("esp32/sensor");

    if(mqttClient.publish(topic.c_str(), payload.c_str())) 
    {
        Serial.println("Published to " + topic + ": " + payload);
    } 

    else 
    {
        Serial.println("Failed to publish telemetry :(");
    }

}

void setup() 
{
  Serial.begin(115200);
  rgb.begin();
  rgb.show();
  
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  
  gpsSerial.begin(9600, SERIAL_8N1, RX, TX);
  
  digitalWrite(TRIG, LOW);
  delay(1000);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Connected to WiFi!");

  mqttClient.setServer(MQTT_BROKER_IP, MQTT_PORT);
}

void lightIndication(float distance) 
{

  if (distance > 20)
  {
    rgb.setPixelColor(0, rgb.Color(255, 0, 0));
  }

  else if (distance >= 10 && distance <= 20)
  {
    rgb.setPixelColor(0, rgb.Color(255, 255, 0));
  }

  else if (distance >= 0 && distance <= 10)
  {
    rgb.setPixelColor(0, rgb.Color(0, 255, 0));
  }

  rgb.show();
}

void loop() 
{
  float totalDistance = 0;
  int validMeasurements = 0;

  for (int i = 0; i < 3; i++)
  {
    digitalWrite(TRIG, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG, LOW);
    
    duration = pulseIn(ECHO, HIGH);
    
    if (duration > 0 && duration < 38000) 
    {
      totalDistance += (duration / 58.0);
      validMeasurements++;
    }
    
    delay(50);
  }
  
  if (validMeasurements == 0) 
  {
    Serial.println("Out of range");
  } 
  else 
  {
    distance = totalDistance / validMeasurements;
    Serial.print("Average distance: ");
    Serial.print(distance);
    Serial.println(" cm");
    lightIndication(distance);
  }
  
  while (gpsSerial.available()) 
  {
    gps.encode(gpsSerial.read());
  }
  
  if (gps.location.isValid()) 
  {
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
    Serial.println("----------------------");
  } 

  else 
  {
    Serial.println("GPS: disconnected");
  }

  fillPercentage = ((binLength - distance) / binLength) * 100;

  if (fillPercentage < 0) {
    fillPercentage = 0;
  } else if (fillPercentage > 100) {
    fillPercentage = 100;
  }

  if(fillPercentage == 0)
  {
    status = "EMPTY";
  }

  else if(fillPercentage > 0 && fillPercentage < 30)
  {
    status = "LOW";
  }

  else if(fillPercentage >= 30 && fillPercentage < 70)
  {
    status = "MEDIUM";
  }

  else if(fillPercentage >= 70)
  {
    status = "FULL";
  }

  if (WiFi.status() == WL_CONNECTED) {
    if (!mqttClient.connected()) {
      reconnectMqtt();
    }
    mqttClient.loop();
  }

  publishTelemetry();
  
  delay(500);
}