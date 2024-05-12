import type { WeatherData } from "../utils/weatherData";

interface FallbackProp {
  weatherData: WeatherData;
}

export default function Fallback({ weatherData }: FallbackProp) {
  if (!weatherData) {
    return;
  }

  const { main, wind, name } = weatherData;

  if (!main && !wind && !name) {
    return;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px",
      }}
    >
      <div>{`City is ${name}`}</div>
      <div>{`The temp is ${main.temp}`}</div>
      <div>{`Humidity is ${main.humidity}`}</div>
      <div>{`Wind is ${wind.speed}`}</div>
    </div>
  );
}
