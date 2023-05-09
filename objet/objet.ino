/*
 Script arduino qui nécessite l'utilisation d'un capteur DHT11 connecté sur la
 pin 2

 Inspiree de :
 https://docs.arduino.cc/tutorials/communication/wifi-nina-examples#wifinina-simple-web-server-wifi

 */
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <SD.h>
#include <SPI.h>
#include <Servo.h>
#include <WiFiClient.h>
#include <WiFiNINA.h>

char ssid[] = "BELL125";
char pass[] = "5EC4CA979615";
int status = WL_IDLE_STATUS;

WiFiServer server(80);

// Variables du serveur raspberry pi
char ip[] = "192.168.2.23";
int port = 8080;
WiFiClient wifi;
HttpClient client = HttpClient(wifi, ip, port);

// Capteur de temperature
DHT dht(2, DHT11);
float temperature;

// Servomoteur
#define PIN_MOTEUR 6
Servo servo;

// Intrusion
#define PIN_LED 7
int distance_intrusion;
bool intrusion = false;
#define INTRUSION_TRESHOLD 10;

// Capteur ultrasonique
#define PIN_TRIG 4
#define PIN_ECHO 5
int distance;

// Carte microsd
File fichier;

const unsigned long delai_ms = 10000;  // dix secondes
unsigned long dernier_ms = 0;

void setup() {
    Serial.begin(9600);

    if (WiFi.status() == WL_NO_MODULE) {
        Serial.println("La communication avec le wifi n'a pas marché!");
        while (true) {
        }
    }

    String fv = WiFi.firmwareVersion();

    if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
        Serial.println("SVP mettre à jour le logiciel.");
    }

    // attempt to connect to Wifi network:
    while (status != WL_CONNECTED) {
        Serial.print("Tentative de connection au réseau nommé: ");
        Serial.println(ssid);  // print the network name (SSID);

        status = WiFi.begin(ssid, pass);
        delay(10000);
    }

    server.begin();       // start the web server on port 80
    print_wifi_status();  // you're connected now, so print out the status

    dht.begin();
    servo.attach(PIN_MOTEUR);

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(PIN_TRIG, OUTPUT);
    pinMode(PIN_ECHO, INPUT);
    pinMode(PIN_LED, OUTPUT);

    calculer_dist();

    distance_intrusion = distance;

    if (!SD.begin()) {
        Serial.println("Impossible de lancer le module SD.");
        while (true) {
        }
    }

    envoie_donnees(jsonifier_sd());
    SD.open("data.txt", FILE_WRITE | O_TRUNC).close();
}

void loop() {
    if (intrusion) {
        Serial.println("INTRUSION DETECTEE");
        digitalWrite(PIN_LED, HIGH);
        delay(1000);
        digitalWrite(PIN_LED, LOW);
        delay(1000);
        return;
    }
    WiFiClient client = server.available();  // listen for incoming clients

    gerer_requetes(client);
    calculer_dist();
    detecter_intrusion();

    temperature = dht.readTemperature();

    servo.write(map(temperature, 0, 40, 0, 180));

    envoie_donnee(temperature);
}

void gerer_requetes(WiFiClient client) {
    if (client) {  // if you get a client,
        Serial.println(
            "nouveau client");  // print a message out the serial port
        String currentLine = "";

        while (client.connected()) {     // loop while the client's connected
            if (client.available()) {    // if there's bytes to read from the
                                         // client,
                char c = client.read();  // read a byte, then
                Serial.write(c);         // print it out the serial monitor
                if (c == '\n') {         // if the byte is a newline character

                    // if the current line is blank, you got two newline
                    // characters in a row. that's the end of the client HTTP
                    // request, so send a response:
                    if (currentLine.length() == 0) {
                        // HTTP headers always start with a response code (e.g.
                        // HTTP/1.1 200 OK) and a content-type so the client
                        // knows what's coming, then a blank line:
                        client.println("HTTP/1.1 200 OK");
                        client.println("Content-type:text/html");
                        client.println();

                        // the content of the HTTP response follows the header:
                        client.print("");

                        // The HTTP response ends with another blank line:
                        client.println();
                        // break out of the while loop:
                        break;
                    } else {  // if you got a newline, then clear currentLine:
                        currentLine = "";
                    }
                } else if (c != '\r') {  // if you got anything else but a
                                         // carriage return character,
                    currentLine += c;    // add it to the end of the currentLine
                }

                if (currentLine.endsWith("GET /stop")) {
                    Serial.println();
                    Serial.println("L'envoie de donnees est en arret.");
                    digitalWrite(LED_BUILTIN, LOW);
                }

                if (currentLine.endsWith("GET /demarrer")) {
                    Serial.println();
                    Serial.println("L'envoie de donnees est en marche.");
                    digitalWrite(LED_BUILTIN, HIGH);
                }
            }
        }

        // close the connection:
        client.stop();
        Serial.println("client est déconnecté");
    }
}

void calculer_dist() {
    digitalWrite(PIN_TRIG, LOW);
    delayMicroseconds(2);

    digitalWrite(PIN_TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(PIN_TRIG, LOW);

    long duration = pulseIn(PIN_ECHO, HIGH);

    distance = duration * 0.034 / 2;
}

void detecter_intrusion() {
    intrusion = abs(distance_intrusion - distance) > INTRUSION_TRESHOLD;
    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.print(" Distance intrusion: ");
    Serial.println(distance_intrusion);

    if (intrusion) {
        if (WiFi.status() != WL_CONNECTED) {
            Serial.println("INTRUSION DETECTEE");
            return;
        }

        Serial.println("Envoie des donnees d'intrusion.");

        String sortie = "";
        String content_type = "application/json";
        client.post("/intrusion", content_type, sortie);
        int etat_http = client.responseStatusCode();
        client.responseBody();

        Serial.print("Code d'etat HTTP: ");
        Serial.println(etat_http);
        client.stop();
    }
}

void print_wifi_status() {
    // print the SSID of the network you're attached to:
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());

    // print your board's IP address:
    IPAddress ip = WiFi.localIP();
    Serial.print("Adresse IP: ");
    Serial.println(ip);

    // print the received signal strength:
    long rssi = WiFi.RSSI();
    Serial.print("signal strength (RSSI):");
    Serial.print(rssi);
    Serial.println(" dBm");

    // print where to go in a browser:
    Serial.print(
        "Pour voir cette page en action, ouvrer votre navigateur à http://");
    Serial.println(ip);
}

/**
 * Fonction qui permet l'envoie des donnees seulement si le delais est depassé.
 * Auteur: William Boudreault
 */
void envoie_donnee(float valeur) {
    unsigned long ms = millis();
    bool delais_depasse = ms - dernier_ms > delai_ms;

    if (!delais_depasse) {
        return;
    }
    dernier_ms = ms;

    if (WiFi.status() != WL_CONNECTED) {
        ecrire_sd(valeur);
        return;
    }

    Serial.println("Envoie des donnees.");

    String sortie;
    StaticJsonDocument<16> json;

    json["value_celsius"] = valeur;
    serializeJson(json, sortie);
    String content_type = "application/json";
    client.post("/temperature", content_type, sortie);
    int etat_http = client.responseStatusCode();

    client.responseBody();

    Serial.print("Code d'etat HTTP: ");
    Serial.println(etat_http);
    if (etat_http != 201) {
        ecrire_sd(valeur);
    }
    client.stop();
}

void ecrire_sd(float valeur) {
    fichier = SD.open("data.txt", FILE_WRITE);

    if (fichier == NULL) return;

    Serial.println("Ecriture sur la carte...");
    fichier.print(valeur);
    fichier.print(';');
    fichier.close();
}

String jsonifier_sd() {
    fichier = SD.open("data.txt", FILE_READ);

    if (fichier == NULL) return "{}";

    String data = "";

    data = fichier.readString();

    String json = "[";

    String curr_value = "";
    for (int index = 0; index < data.length(); index++) {
        char curr_char = data[index];
        if (curr_char == ';') {
            json += "{\"value_celsius\":" + curr_value + '}';

            if (index != data.length() - 1) {
                json += ',';
            }

            curr_value = "";
            continue;
        }

        curr_value += curr_char;
    }

    json += ']';

    fichier.close();
    return json;
}

void envoie_donnees(String valeurs) {
    if (WiFi.status() != WL_CONNECTED) {
        return;
    }

    Serial.println("Envoie des donnees.");

    String content_type = "application/json";
    client.post("/temperature/many", content_type, valeurs);
    int etat_http = client.responseStatusCode();

    client.responseBody();

    Serial.print("Code d'etat HTTP: ");
    Serial.println(etat_http);
    client.stop();
}