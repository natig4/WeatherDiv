import { fetchData, getDayOfWeek, getFormattedNum } from "./helpers";
import {
  API_URL,
  API_TIMEFRAME,
  IWeatherAPIResponse,
  TempDisplay,
  ImageSourceKeys,
  ImageSource,
  Forecastday,
} from "./models";

export async function getLocationWeather(
  {
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  },
  apiKey: String
) {
  const url = `${API_URL}?q=${lat},${lon}&days=${API_TIMEFRAME}&key=${apiKey}`;

  try {
    const data = (await fetchData(url)) as IWeatherAPIResponse;
    return data;
  } catch (error) {
    return null;
  }
}

export function getWeatherForUi(
  weather: IWeatherAPIResponse,
  selectedTemp: TempDisplay
) {
  const { name, country } = weather.location;

  return {
    name: `${name}, ${country}`,
    temps: calculateAvgTemp(weather.forecast.forecastday, selectedTemp),
  };
}

export function getImgByRecommendation(
  recommendation: ImageSourceKeys
): ImageSource {
  switch (recommendation) {
    case ImageSourceKeys.cloud:
      return ImageSource.cloud;
    case ImageSourceKeys.cold:
      return ImageSource.cold;
    case ImageSourceKeys.hot:
      return ImageSource.hot;
    case ImageSourceKeys.rain:
      return ImageSource.rain;
    case ImageSourceKeys.snow:
      return ImageSource.snow;
  }
}

function calculateAvgTemp(days: Forecastday[], selectedTemp: TempDisplay) {
  const adjustedDays = days.reduce(
    (weekDays, day) => {
      const temp =
        selectedTemp === "Celsius" ? day.day.avgtemp_c : day.day.avgtemp_f;
      const currDay = { temp, day: getDayOfWeek(day.date) };
      const arrPosition = weekDays.find(({ day }) => day === currDay.day);
      if (arrPosition) {
        arrPosition.temp.push(currDay.temp);
      } else {
        weekDays.push({ day: currDay.day, temp: [currDay.temp] });
      }

      return weekDays;
    },
    [] as {
      temp: number[];
      day: string;
    }[]
  );

  return adjustedDays.map(({ day, temp: temps }) => {
    const tempSum = temps.reduce((min, temp) => {
      return min + temp;
    }, 0);

    const temp = getFormattedNum(tempSum / temps.length);

    const recommendation = getRecommendationByTemp(+temp, selectedTemp);
    return {
      day,
      temp: temp + ` ${selectedTemp === "Celsius" ? "℃" : "℉"}`,
      recommendation,
    };
  });
}

function getRecommendationByTemp(
  temp: number,
  selectedTemp: TempDisplay
): ImageSourceKeys {
  temp = selectedTemp === "Celsius" ? temp : (temp - 32) * (5 / 9);
  if (temp < 0) {
    return ImageSourceKeys.snow;
  }
  if (temp < 10) {
    return ImageSourceKeys.cold;
  }
  if (temp < 17) {
    return ImageSourceKeys.rain;
  }
  if (temp < 23) {
    return ImageSourceKeys.cloud;
  }

  return ImageSourceKeys.hot;
}
