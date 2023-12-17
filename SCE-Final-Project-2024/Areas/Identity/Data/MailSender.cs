using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Threading.Tasks;
using MailKit.Security;

namespace SCE_Final_Project_2024.Areas.Identity.Data
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var emailMessage = new MimeMessage();

                emailMessage.From.Add(new MailboxAddress("Magic Elves", "from@example.com"));
                emailMessage.To.Add(new MailboxAddress("", email));
                emailMessage.Subject = subject;

                var multipart = new Multipart("alternative");

                // Text version
                var plainText = new TextPart(TextFormat.Plain)
                {
                    Text = "Congrats for sending test email with Mailtrap!\n\n" +
                           "If you are viewing this email in your inbox – the integration works.\n" +
                           "Now send your email using our SMTP server and integration of your choice!\n" +
                           "Good luck! Hope it works."
                };
                multipart.Add(plainText);

                // HTML version
                var htmlText = new TextPart(TextFormat.Html)
                {
                    Text = message // The HTML content you want to send
                };
                multipart.Add(htmlText);

                emailMessage.Body = multipart;

                using var client = new SmtpClient();
                await client.ConnectAsync("sandbox.smtp.mailtrap.io", 2525, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync("0f5a80e87ab468", "cfaf70a578a607"); // Replace with your Mailtrap password
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw; // Rethrow the exception to propagate it
            }
        }
    }
}
