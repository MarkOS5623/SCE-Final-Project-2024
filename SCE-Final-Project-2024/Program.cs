using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using SCE_Final_Project_2024.Areas.Documents.Data;
using SCE_Final_Project_2024.Areas.Identity.Data;
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("AccountDbContextConnection") ??
    throw new InvalidOperationException("Connection string 'AccountDbContextConnection' not found.");

builder.Services.AddDbContext<AccountDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDbContext<DocsContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Account>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AccountDbContext>();

builder.Services.AddRazorPages();

builder.Services.AddTransient<IEmailSender, EmailSender>();

SyncfusionLicenseProvider.RegisterLicense("Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5eeHRcQ2VfUEF2Wks=");

// Add logging
builder.Services.AddLogging(builder =>
{
    builder.AddConsole();
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.MapAreaControllerRoute(
    name: "DocumentsArea",
    areaName: "Documents",
    pattern: "Documents/{action=Index}/{id?}");

app.Run();
