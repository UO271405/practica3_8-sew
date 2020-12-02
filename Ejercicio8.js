"use strict";
class Meteo{
    constructor(){
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.error = "<h2>¡problemas! No puedo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
    }
    
    cargarDatos(ciudad, codigoPais){
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                $('.json').text(JSON.stringify(datos, null, 2));

                $('.datos').empty();    
                $('.datos').append('<img src="https://openweathermap.org/img/w/' + datos.weather[0].icon + '.png" alt="img weather">');
                $('.datos').append("<br>Ciudad: " + datos.name + "<br>");
                $('.datos').append("País: " + datos.sys.country + "<br>");
                $('.datos').append("Latitud: " + datos.coord.lat + " grados<br>");
                $('.datos').append("Longitud: " + datos.coord.lon + " grados<br>");
                $('.datos').append("Temperatura: " + datos.main.temp + " grados Celsius<br>");
                $('.datos').append("Máx temperatura: " + datos.main.temp_max + " celsius<br>");
                $('.datos').append("Min temperatura: " + datos.main.temp_min + " celsius<br>");
                $('.datos').append("Presión: " + datos.main.pressure + " milímetros<br>");
                $('.datos').append("Humedad: " + datos.main.humidity + "%<br>"); 
                $('.datos').append("Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "<br>"); 
                $('.datos').append("Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "<br>"); 
                $('.datos').append("Velocidad del viento: " + datos.wind.speed + "metros/segundo<br>"); 
                $('.datos').append("Dirección del viento: " + datos.wind.deg +"grados<br>");
                $('.datos').append("Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "<br>");
                $('.datos').append("Descripción: " + datos.weather[0].description + "<br>");
                $('.datos').append("Visibilidad: " + datos.visibility + " metros<br>");
                $('.datos').append("Nubosidad: " + datos.clouds.all + " %");
            },
            error:function(){
                document.write(this.error);    
            }
        });
    }

    verJSON(ciudad, codigoPais){
        this.cargarDatos(ciudad, codigoPais);
    }
}

var meteo = new Meteo();