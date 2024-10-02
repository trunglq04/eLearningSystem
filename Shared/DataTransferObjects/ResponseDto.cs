using System.Text.Json.Serialization;

namespace Shared.DataTransferObjects
{
    public class ResponseDto
    {
        public List<string> Message { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Object? Data { get; }


        public ResponseDto(List<string> message, Object? data = default)
        {
            Message = message;
            Data = data;
        }
    }
}
