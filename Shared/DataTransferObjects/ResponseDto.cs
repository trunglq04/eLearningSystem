using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
