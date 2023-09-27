namespace SurveyApi.Models
{
public class Survey
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public ICollection<SurveyQuestion>? Questions { get;set; }
    }

}