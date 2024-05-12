import Skeleton from "./Skeleton";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  name: string;
  wind: {
    speed: number;
  };
}

interface DataDisplayProps {
  cityData: WeatherData | undefined;
  isLoading: boolean;
}

export default function DataDisplay({ cityData, isLoading }: DataDisplayProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  if (!cityData) {
    return <div>City data is not available. Try a different search.</div>;
  }
  const { name, main, wind } = cityData;

  if (!name && !main && !wind) {
    return <div>Something went wrong. Try a different search.</div>;
  }

  return (
    <div>
      <div className="w-full my-6 flex justify-between items-end">
        <div>city</div>
        <div className="text-4xl">{name}</div>
      </div>
      <div className="w-full my-6 flex justify-between items-end">
        <div>temp</div>
        <div className="text-4xl">{`${main.temp} °c`}</div>
      </div>
      <div className="w-full my-6 flex justify-between items-end">
        <div>Humidity</div>
        <div className="text-4xl">{main.humidity}</div>
      </div>
      <div className="w-full my-6 flex justify-between items-end">
        <div>Wind</div>
        <div className="text-4xl">{`${wind.speed} m/s`}</div>
      </div>
    </div>
  );
}
