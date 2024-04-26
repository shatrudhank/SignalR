using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class PartyHub:Hub
    {
        public async Task JoinParty(string partyName)
        {
            await Clients.Caller.SendAsync("status", partyName, true);
            await Clients.Others.SendAsync("newMemberAdded", partyName, true);
            await Groups.AddToGroupAsync(Context.ConnectionId,partyName);
        }

        public async Task LeaveParty(string partyName)
        {
            await Clients.Caller.SendAsync("status", partyName, false);
            await Clients.Others.SendAsync("memberLeft", partyName, true);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, partyName);
        }

        public async Task NotifyParty(string partyName)
        {
            await Clients.Group(partyName).SendAsync("notify", "Message for "+partyName);
        }
    }
}
