using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var result = await mediator.Send(command);

        if (result.IsSuccess && result.Value != null)
        {
            await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", result.Value);
        }
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var activityId = httpContext?.Request.Query["activityId"].ToString();

        if (string.IsNullOrEmpty(activityId)) return;

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

        var result = await mediator.Send(new GetComments.Query { ActivityId = activityId });

        if (result.IsSuccess && result.Value != null)
        {
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}