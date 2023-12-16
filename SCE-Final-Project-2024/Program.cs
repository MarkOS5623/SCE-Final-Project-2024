using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SCE_Final_Project_2024.Areas.Identity.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("AccountDbContextConnection") ?? throw new InvalidOperationException("Connection string 'AccountDbContextConnection' not found.");

builder.Services.AddDbContext<AccountDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Account>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AccountDbContext>();


// Add services to the container.
builder.Services.AddRazorPages();

// Builder service that adds account DB context to the database
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Remove the following lines
app.UseAuthentication();
app.UseAuthorization();

// Map Razor Pages and Controllers
app.MapRazorPages();
app.MapControllers();

app.Run();
