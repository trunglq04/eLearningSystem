using eLearningSystem.API.Extensions;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.ConfigureCors(builder.Configuration);
builder.Services.ConfigureIISIntegration();

builder.Services.AddControllers()
    .AddApplicationPart(typeof(eLearningSystem.Presentation.AssemblyReference).Assembly)
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(ms => ms.Value.Errors.Count > 0)
                .SelectMany(ms =>
                    ms.Value.Errors.Select(e => e.ErrorMessage)
                ).ToList();

            return new BadRequestObjectResult(new { Message = errors });
        };
    });
builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddAuthentication();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureJWT(builder.Configuration);
builder.Services.ConfigureSqlContext(builder.Configuration);


var app = builder.Build();


app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
