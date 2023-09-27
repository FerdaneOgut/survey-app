using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.Data;
using SurveyApi.Interfaces;
using SurveyApi.Models;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class SurveyController : ControllerBase
{

  private readonly ILogger<SurveyController> _logger;
  private readonly ISurveyRepository _surveyRepository;
  public SurveyController(ILogger<SurveyController> logger, ISurveyRepository surveyRepository)
  {
    _logger = logger;
    _surveyRepository = surveyRepository;
  }

  public async Task<IActionResult> Get()
  {
    var books = await _surveyRepository.GetAllAsync();

    return Ok(books);

  }

  [HttpPost(Name = "CreateSurvey")]
  public async Task<IActionResult> Post([FromBody] Survey survey)
  {
    try
    {
      await _surveyRepository.CreateSurveyAsync(survey);
      return Ok(survey);

    }
    catch (Exception ex)
    {

      _logger.LogError("CreateSurvey", ex);
      return StatusCode(StatusCodes.Status500InternalServerError,
          ex);
    }
  }

  [HttpGet("{id:int}")]
  public async Task<IActionResult> GetByIDAsync(int id)
  {
    try
    {
      var result = await _surveyRepository.GetSurveyByIDAsync(id);

      if (result == null) return NotFound();

      return Ok(result);
    }
    catch (Exception)
    {
      return StatusCode(StatusCodes.Status500InternalServerError,
          "Error retrieving data from the database");
    }
    

  }
}
