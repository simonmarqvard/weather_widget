import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  city: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { city = "copenhagen" }: RequestBody = req.body;

    if (!city) {
      return res.status(400).json({ message: "bad request" });
    }

    const key = process.env.WEATHER_API_KEY;

    if (!key) {
      return res.status(500).json({ message: "missing credentials in call" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong fetching in API: ${err}` });
  }
}
