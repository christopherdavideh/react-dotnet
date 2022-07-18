using Microsoft.AspNetCore.Mvc;

namespace react_dotnet.Controllers;

[ApiController]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private static List<WeatherForecast> listWeatherForecast = new List<WeatherForecast>();

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;

        if (listWeatherForecast == null || !listWeatherForecast.Any())
        {
            listWeatherForecast = Enumerable.Range(1, 10).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToList();
        }
    }

    [HttpGet/*(Name = "GetWeatherForecast")*/]
    [Route("[controller]/getData")]
    public IEnumerable<WeatherForecast> Get()
    {
        return listWeatherForecast;
    }

    [HttpPost]
    [Route("[controller]/newData")]
    public IActionResult Post(WeatherForecast data)
    {
        listWeatherForecast.Add(data);
        return Ok();
    }

    [HttpDelete]
    [Route("[controller]/deleteData/{index}")]
    public IActionResult Delete(int index)
    {
        listWeatherForecast.RemoveAt(index);
        return Ok();
    }
}
