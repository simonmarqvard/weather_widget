import MainComponent from "../components/MainComponent";
import Fallback from "../components/Fallback";
import { GetServerSidePropsContext } from "next";
import type { WeatherData } from "../utils/weatherData";

interface FallbackProp {
  weatherData: WeatherData;
}

export default function Home({ weatherData }: FallbackProp) {
  return (
    <div>
      <MainComponent />
      <noscript>
        <Fallback weatherData={weatherData} />
      </noscript>
    </div>
  );
}

//https://stackoverflow.com/questions/65752932/internal-api-fetch-with-getserversideprops-next-js
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { city = "copenhagen" } = query;

  try {
    const key = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );

    const weatherData = await response.json();

    if (!weatherData) {
      return { props: {} };
    }

    return {
      props: {
        weatherData,
      },
    };
  } catch (err) {
    console.error("something went wrong in ServerSideProps");
    return {
      props: {
        weatherData: "error",
      },
    };
  }
}
