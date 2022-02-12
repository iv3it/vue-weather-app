let weatherCodeToIcon = {
  200: ["11"],
  201: ["11"],
  202: ["11"],
  210: ["11"],
  211: ["11"],
  212: ["11"],
  221: ["11"],
  230: ["11"],
  231: ["11"],
  232: ["11"],

  300: ["09"],
  301: ["09"],
  302: ["09"],
  310: ["09"],
  311: ["09"],
  312: ["09"],
  313: ["09"],
  314: ["09"],
  321: ["09"],

  500: ["09"],
  501: ["09"],
  502: ["09"],
  503: ["09"],
  504: ["09"],
  511: ["13"],
  520: ["09"],
  521: ["09"],
  522: ["09"],
  531: ["09"],

  600: ["13"],
  601: ["13"],
  602: ["13"],
  611: ["13"],
  612: ["13"],
  613: ["13"],
  615: ["13"],
  616: ["13"],
  620: ["13"],
  621: ["13"],
  622: ["13"],

  701: ["50"],
  711: ["50"],
  721: ["50"],
  731: ["50"],
  741: ["50"],
  751: ["50"],
  761: ["50"],
  762: ["50"],
  771: ["50"],
  781: ["781"],

  800: ["01d", "01n"],

  801: ["02d", "02n"],
  802: ["03"],
  803: ["04"],
  804: ["04"],
}

export function getWeatherIcon(isCurrent, weatherCode, sunsetTime, currentTime) {
  let fallbackIcon = "03";

  if(!weatherCodeToIcon.hasOwnProperty(weatherCode)) {
    return fallbackIcon;
  }

  let weatherIconIndex = 0;
  
  if((isCurrent && currentTime > sunsetTime) && weatherCodeToIcon[weatherCode].length > 1) {
    weatherIconIndex = 1;
  }
  
  return weatherCodeToIcon[weatherCode][weatherIconIndex];
}
