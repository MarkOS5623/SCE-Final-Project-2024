using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using SCE_Final_Project_2024.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("AccountDbContextConnection") ?? throw new InvalidOperationException("Connection string 'AccountDbContextConnection' not found.");

builder.Services.AddDbContext<AccountDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Account>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AccountDbContext>();

// Add services to the container.
builder.Services.AddRazorPages();

// Get the IEmailSender from the DI container
builder.Services.AddTransient<IEmailSender, EmailSender>();

// Build the initial application to retrieve the IServiceProvider
var app = builder.Build();

SyncfusionLicenseProvider.RegisterLicense("Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5eeHRcQ2VfUEF2Wks=");

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Map Razor Pages and Controllers
app.MapRazorPages();
app.MapControllers();

app.Run();
