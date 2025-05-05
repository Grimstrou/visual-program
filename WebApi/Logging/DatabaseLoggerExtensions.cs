using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace WebApi.Logging
{
    public static class DatabaseLoggerExtensions
    {
        public static ILoggingBuilder AddDatabaseLogger(this ILoggingBuilder builder)
        {
            builder.Services.AddSingleton<ILoggerProvider, DatabaseLoggerProvider>();
            return builder;
        }
    }
} 