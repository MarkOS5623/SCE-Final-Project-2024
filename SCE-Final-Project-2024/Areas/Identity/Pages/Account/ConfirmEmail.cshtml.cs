// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using SCE_Final_Project_2024.Areas.Identity.Data;



    public class ConfirmEmailModel : PageModel
    {
    private readonly UserManager<Account> _userManager;
    private readonly IEmailSender _emailSender; // Inject the IEmailSender service

    public ConfirmEmailModel(UserManager<Account> userManager, IEmailSender emailSender)
    {
        _userManager = userManager;
        _emailSender = emailSender;
    }

    /// <summary>
    ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
    ///     directly from your code. This API may change or be removed in future releases.
    /// </summary>
    [TempData]
        public string StatusMessage { get; set; }
    public async Task<IActionResult> OnGetAsync(string userId, string code)
    {
        if (userId == null || code == null)
        {
            return RedirectToPage("/Index");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound($"Unable to load user with ID '{userId}'.");
        }

        code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
        var result = await _userManager.ConfirmEmailAsync(user, code);

        if (result.Succeeded)
        {
            // Send a confirmation email
            var emailSubject = "Email Confirmed";
            var emailMessage = "Thank you for confirming your email.";

            await _emailSender.SendEmailAsync(user.Email, emailSubject, emailMessage);

            StatusMessage = "Thank you for confirming your email.";
        }
        else
        {
            StatusMessage = "Error confirming your email.";
        }

        return Page();
    }
}

