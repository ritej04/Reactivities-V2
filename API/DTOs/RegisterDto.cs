using System.ComponentModel.DataAnnotations;
using Application.Activities.Queries;
using Microsoft.Net.Http.Headers;

namespace API.Middleware;

public class RegisterDto
{
    [Required]
    public string DisplayName {get; set;} ="";
    [Required]
    [EmailAddress]
    public string Email {get; set;} ="";
    public string Password {get; set;} ="";
}
