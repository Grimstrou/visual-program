using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.Repositories;
using WebApi.Services;
using WebApi.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();

// Configure logging
builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
    logging.AddDatabaseLogger();
    logging.SetMinimumLevel(LogLevel.Information);
    logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.Warning);
    logging.AddFilter("Microsoft.AspNetCore", LogLevel.Warning);
    logging.AddFilter("System", LogLevel.Warning);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("/", () => "Welcome to the Comments API!");

app.MapGet("/comments", ([FromServices] CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting all comments");
    var comments = service.GetAllComments();
    return Results.Ok(comments);
});

app.MapGet("/comments/{id}", ([FromServices] CommentService service, ILogger<Program> logger, int id) =>
{
    logger.LogInformation($"Getting comment with ID: {id}");
    var comment = service.GetCommentById(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.MapPost("/comments", ([FromServices] CommentService service, ILogger<Program> logger, [FromBody] Comment comment) =>
{
    logger.LogInformation($"Adding new comment from author: {comment.Author}");
    service.AddComment(comment);
    return Results.Created($"/comments/{comment.Id}", comment);
});

app.MapPatch("/comments/{id}", ([FromServices] CommentService service, ILogger<Program> logger, int id, [FromBody] Comment updatedComment) =>
{
    logger.LogInformation($"Updating comment with ID: {id}");
    var comment = service.GetCommentById(id);
    if (comment == null)
    {
        logger.LogWarning($"Comment with ID {id} not found");
        return Results.NotFound();
    }

    service.UpdateComment(id, updatedComment);
    var updatedResult = service.GetCommentById(id);
    return Results.Ok(updatedResult);
});

app.MapDelete("/comments/{id}", ([FromServices] CommentService service, ILogger<Program> logger, int id) =>
{
    logger.LogInformation($"Deleting comment with ID: {id}");
    var comment = service.GetCommentById(id);
    if (comment == null)
    {
        logger.LogWarning($"Comment with ID {id} not found");
        return Results.NotFound();
    }

    service.DeleteComment(id);
    return Results.NoContent();
});

// Add endpoints for logs
app.MapGet("/logs", ([FromServices] AppDbContext context, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting all logs");
    var logs = context.Logs.OrderByDescending(l => l.Timestamp).ToList();
    return Results.Ok(logs);
});

app.MapGet("/logs/search", ([FromServices] AppDbContext context, ILogger<Program> logger, [FromQuery] string? level, [FromQuery] string? search) =>
{
    logger.LogInformation("Searching logs");
    var query = context.Logs.AsQueryable();

    if (!string.IsNullOrEmpty(level))
    {
        query = query.Where(l => l.Level == level);
    }

    if (!string.IsNullOrEmpty(search))
    {
        query = query.Where(l => l.Message != null && l.Message.Contains(search) || 
                               l.Action != null && l.Action.Contains(search));
    }

    var logs = query.OrderByDescending(l => l.Timestamp).ToList();
    return Results.Ok(logs);
});

app.Run();