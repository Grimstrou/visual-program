namespace WebApi.Models
{
    public class Log
    {
        public int Id { get; set; }
        public string Level { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string? Exception { get; set; }
        public DateTime Timestamp { get; set; }
        public string? User { get; set; }
        public string? Action { get; set; }
    }
} 