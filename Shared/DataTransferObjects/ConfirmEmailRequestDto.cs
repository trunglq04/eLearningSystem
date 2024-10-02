namespace Shared.DataTransferObjects
{
    public record ConfirmEmailRequestDto(string email, string token);
}
