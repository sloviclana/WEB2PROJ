namespace WebServer.Services.Interfaces
{
    public interface IEmailVerifyService
    {
        void SendVerificationMail(string prodavacMail, string statusVerifikacije);
    }
}
