using Microsoft.AspNetCore.Http;

namespace Service.Contracts
{
    public interface IMediaService
    {
        Task<string> UploadImageAsync(IFormFile file);
    }
}
