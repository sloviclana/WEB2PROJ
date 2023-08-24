namespace WebServer.Infrastructure.Configuration
{
    public class EmailVerifyConfiguration
    {
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string MessageAccepted { get; set; }
        public string MessageDenied { get; set; }
        public string Subject { get; set; }
    }
}
