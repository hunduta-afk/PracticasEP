import serial
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

arduino = serial.Serial('/dev/ttyACM1',9600)

data = {"humedad":0,"temperatura":0}

class MyServer(BaseHTTPRequestHandler):

    def do_GET(self):

        global data

        if self.path == "/sensor":

            line = arduino.readline().decode().strip()

            try:
                h,t = line.split(",")
                data["humedad"] = float(h)
                data["temperatura"] = float(t)
            except:
                pass

            self.send_response(200)
            self.send_header('Content-type','application/json')

            # 🔥 SOLUCIÓN CORS
            self.send_header('Access-Control-Allow-Origin', '*')

            self.end_headers()
            
          

            self.wfile.write(json.dumps(data).encode())

server = HTTPServer(("0.0.0.0",9000),MyServer)

print("Servidor sensores activo")

server.serve_forever()
