#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

#define TRIG 12
#define ECHO 11

#define RGB_BUILTIN 38

#define RGB_PIN 14
#define RGB_COUNT 1

Adafruit_NeoPixel rgb(RGB_COUNT, RGB_PIN, NEO_GRB + NEO_KHZ800);

float distance;
float meter;
unsigned long duration = 0;

void setup()
{
  Serial.begin(115200);


  rgb.begin();
  rgb.show();

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  digitalWrite(TRIG, LOW);
  delay(1000);
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
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH);

  if (duration >= 38000)
  {
    Serial.println("Out of range");
  }
  else
  {
    distance = duration / 58.0;
    // meter = distance / 100.0;

    Serial.print(distance);
    Serial.print(" cm\t");

    lightIndication(distance);
  }
}



