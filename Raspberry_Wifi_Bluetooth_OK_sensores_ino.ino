#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {

Serial.begin(9600);
dht.begin();

}

void loop() {

float humedad = dht.readHumidity();
float temperatura = dht.readTemperature();

if(isnan(humedad) || isnan(temperatura)){
  return;
}

Serial.print(humedad);
Serial.print(",");
Serial.println(temperatura);

delay(2000);

}