using Microsoft.Extensions.Logging;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Logging
{
    public class DatabaseLogger : ILogger
    {
        private readonly string _categoryName;
        private readonly IServiceProvider _serviceProvider;
        private static bool _isLogging;

        public DatabaseLogger(string categoryName, IServiceProvider serviceProvider)
        {
            _categoryName = categoryName;
            _serviceProvider = serviceProvider;
        }

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            if (_categoryName.Contains("DatabaseLogger") || 
                _isLogging || 
                _categoryName.Contains("Microsoft.EntityFrameworkCore.Database.Command"))
                return false;
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            try
            {
                _isLogging = true;

                using var scope = _serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var message = formatter(state, exception);
                
                var recentLog = dbContext.Logs
                    .Where(l => l.Message == message && 
                               l.Action == _categoryName && 
                               l.Timestamp > DateTime.UtcNow.AddSeconds(-5))
                    .FirstOrDefault();

                if (recentLog == null)
                {
                    var log = new Log
                    {
                        Level = logLevel.ToString(),
                        Message = message,
                        Exception = exception?.ToString(),
                        Timestamp = DateTime.UtcNow,
                        Action = _categoryName
                    };

                    dbContext.Logs.Add(log);
                    dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while logging to database: {ex.Message}");
            }
            finally
            {
                _isLogging = false;
            }
        }
    }
} 