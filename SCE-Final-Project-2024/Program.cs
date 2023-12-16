using Microsoft.EntityFrameworkCore;
using SCE_Final_Project_2024.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Builder service that adds account DB context to the database
builder.Services.AddDbContext<AccountContext>(options =>
{
    options.UseSqlServer("Server=DESKTOP-E4BN869;Database=FinalProjectDB;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;");
});

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

app.UseAuthorization();

// Map Razor Pages and Controllers
app.MapRazorPages();

// Map the AccountsController
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
