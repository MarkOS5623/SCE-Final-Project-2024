using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using SCE_Final_Project_2024.Areas.Documents.Data;
using SCE_Final_Project_2024.Areas.Identity.Data;
using Syncfusion.Licensing;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("AccountDbContextConnection") ??
    throw new InvalidOperationException("Connection string 'AccountDbContextConnection' not found.");

builder.Services.AddDbContext<AccountDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDbContext<DocsContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Account>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<AccountDbContext>();

builder.Services.AddRazorPages();

builder.Services.AddTransient<IEmailSender, EmailSender>();

builder.Services.AddLogging(logging =>
{
    logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
    logging.AddConsole();
    logging.AddDebug();
    logging.AddSerilog();
});

builder.Host.UseSerilog();

SyncfusionLicenseProvider.RegisterLicense("Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5eeHRcQ2VfUEF2Wks=");

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
