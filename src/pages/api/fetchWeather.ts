import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  city: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { city }: RequestBody = req.body;

    if (!city) {
      throw new Error("city required");
    }

    const key = process.env.WEATHER_API_KEY;

    if (!key) {
      throw new Error("API key invalid");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );

    const data = await response.json();

    if (!data) {
      return undefined;
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong fetching in API: ${err}` });
  }
}
