// ===============================
// USUARIO Y CONTRASEÑA
// ===============================

const validUser = "gus";
const validPassword = "1234";


// ===============================
// LOGIN
// ===============================

function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    if(username === validUser && password === validPassword){

        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");

        loginMessage.textContent = "";

        // iniciar lectura de sensores
        leerSensor();

    }else{

        loginMessage.textContent = "Usuario o contraseña incorrectos";

    }

}


// ===============================
// CERRAR SESIÓN
// ===============================

function logout(){

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginContainer").classList.remove("hidden");

}


// ===============================
// ACTUALIZAR DESDE SENSOR REAL
// ===============================

async function leerSensor(){

    try{

        let r = await fetch("http://192.168.10.68:9000/sensor");
        let data = await r.json();

        let h = data.humedad;
        let t = data.temperatura;


        // ===============================
        // MOVER SLIDERS AUTOMÁTICOS
        // ===============================

        document.getElementById("humidity").value = h;
        document.getElementById("temperature").value = t;


        // ===============================
        // ACTUALIZAR TEXTO
        // ===============================

        document.getElementById("humidityValue").textContent = h + "%";
        document.getElementById("temperatureValue").textContent = t + "°C";


        let humidityLed = document.getElementById("humidityLed");
        let temperatureLed = document.getElementById("temperatureLed");

        let humidityStatus = document.getElementById("humidityStatus");
        let temperatureStatus = document.getElementById("temperatureStatus");

        let generalStatus = "Sistema en monitoreo";


        // ===============================
        // LÓGICA HUMEDAD
        // ===============================

        if(h <= 30){

            humidityLed.style.background = "lime";
            humidityStatus.textContent = "Estado: Normal";

            document.getElementById("summaryHumidity").textContent =
            h + "% - Normal";

        }else{

            humidityLed.style.background = "red";
            humidityStatus.textContent = "Estado: Alerta";

            document.getElementById("summaryHumidity").textContent =
            h + "% - Alerta";

            generalStatus = "Atención en humedad";

        }


        // ===============================
        // LÓGICA TEMPERATURA
        // ===============================

        if(t <= 30){

            temperatureLed.style.background = "lime";
            temperatureStatus.textContent = "Estado: Normal";

            document.getElementById("summaryTemperature").textContent =
            t + "°C - Normal";

        }else{

            temperatureLed.style.background = "red";
            temperatureStatus.textContent = "Estado: Alta";

            document.getElementById("summaryTemperature").textContent =
            t + "°C - Alta";

            generalStatus = "Temperatura elevada";

        }


        // ===============================
        // ESTADO GENERAL
        // ===============================

        document.getElementById("generalStatus").textContent = generalStatus;


    }catch(error){

        console.log("Error leyendo sensor", error);

    }

}


// ===============================
// ACTUALIZAR CADA 2 SEGUNDOS
// ===============================

setInterval(leerSensor,2000);
