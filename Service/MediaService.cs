using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Service.Contracts;

namespace Service
{
    public class MediaService : IMediaService
    {
        private readonly Cloudinary _cloudinary;
        private readonly long _maxFileSize = 5 * 1024 * 1024; // 5 MB

        private static readonly string[] _permittedExtensions = { ".jpg", ".jpeg", ".png" };
        private static readonly string[] _permittedMimeTypes = { "image/jpg", "image/jpeg", "image/png" };

        public MediaService(IConfiguration configuration)
        {
            var cloudinaryConfig = configuration.GetSection("Cloudinary");
            var account = new Account(
                cloudinaryConfig["CloudName"],
                cloudinaryConfig["ApiKey"],
                cloudinaryConfig["ApiSecret"]
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string?> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No file uploaded.");
            }

            if (file.Length > _maxFileSize)
            {
                throw new ArgumentException("File size exceeds the maximum limit.");
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !_permittedExtensions.Contains(extension))
            {
                throw new ArgumentException("Invalid file extension.");
            }

            if (!_permittedMimeTypes.Contains(file.ContentType.ToLowerInvariant()))
            {
                throw new ArgumentException("Invalid file type.");
            }

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.AbsoluteUri;
            }

            return null;
        }
    }
}
