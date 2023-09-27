namespace SurveyApi.Models
{
  public class SurveyQuestion
  {
    public int ID { get; set; }
    public string Name { get; set; }
    public int? SurveyID { get; set; }

    public ICollection<SurveyQuestionChoices>? Options { get; set;}
  }

}