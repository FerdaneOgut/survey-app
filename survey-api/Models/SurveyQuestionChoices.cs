namespace SurveyApi.Models
{
public class SurveyQuestionChoices
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int? SurveyQuestionID { get; set; }
    }

}