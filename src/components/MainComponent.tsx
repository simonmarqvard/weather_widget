import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import DataDisplay from "./DataDisplay";
import FormInput from "./FormInput";
import type { WeatherData } from "../utils/weatherData";

export default function MainComponent() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [city, setCity] = useState<string>("copenhagen");

  useEffect(() => {
    if (router.query.city) {
      setCity(router.query.city as string);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCity(inputValue);
    setInputValue("");
    router.push(`/?city=${inputValue}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // call to api for reuse of fetchFunction + hide credentials
  async function fetchWeather(city: string): Promise<WeatherData> {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const response = await axios.post<WeatherData>("/api/fetchWeather", {
        city,
      });
      return response.data;
    } catch (err) {
      throw new Error(`Something went wrong: ${err.message}"`);
    }
  }

  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery<WeatherData>({
    queryKey: [city],
    queryFn: () => fetchWeather(city),
  });

  if (error) {
    <div>Something went wrong when fetching data</div>;
  }

  return (
    <div className="w-full bg-gray-200 flex justify-center items-center h-screen">
      <div className="absolute top-0 left-0 bg-black text-white rounded-r-lg p-3">
        Weather Widget
      </div>
      <div className="w-1/3 bg-gray-300 p-6 rounded-lg shadow-lg">
        <DataDisplay cityData={cityData} isLoading={isLoading} />
        <FormInput
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          value={inputValue}
        />
      </div>
    </div>
  );
}
