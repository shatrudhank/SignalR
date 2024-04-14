using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class UserHub:Hub
    {
        private static int totalUsers { get; set; } = 0;
        private static int totalViews { get; set; } = 0;

        public async Task IncrementTotalViews()
        {
            totalViews++;
            await Clients.All.SendAsync("displayTotalViews", totalViews);
        }

        public override Task OnConnectedAsync()
        {
            totalUsers++;
            Clients.All.SendAsync("displayTotalUsers", totalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            totalUsers--;
            Clients.All.SendAsync("displayTotalUsers", totalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
