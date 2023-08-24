using MailKit.Net.Smtp;
using MimeKit;
using System.Net.Mail;
using WebServer.Infrastructure.Configuration;
using WebServer.Services.Interfaces;

namespace WebServer.Services
{
    public class EmailVerifyService : IEmailVerifyService
    {
        private readonly EmailVerifyConfiguration _emailConfig;

        public EmailVerifyService(EmailVerifyConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendVerificationMail(string prodavacMail, string statusVerifikacije)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_emailConfig.From));
            email.To.Add(MailboxAddress.Parse(prodavacMail));

            email.Subject = _emailConfig.Subject;

            string body = "";
            if (statusVerifikacije.Equals("ACCEPTED"))
            {
                body = _emailConfig.MessageAccepted;
            }
            else if (statusVerifikacije.Equals("DENIED"))
            {
                body = _emailConfig.MessageDenied;
            }


            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_emailConfig.SmtpServer, _emailConfig.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailConfig.UserName, _emailConfig.Password);
            smtp.Send(email);
            smtp.Disconnect(true);


        }


    }

 }

