using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record PagingRequestDto
    {
            public string? Query {  get; init; }
            public string? SortBy { get; init; }
            public string? SortDirection { get; init; }
            public int? PageNumber { get; init; }
            public int? PageSize { get; init; }
    }
}
