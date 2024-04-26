using Microsoft.AspNetCore.SignalR;
using SignalR.Constant;
using SignalR.Data;

namespace SignalR.Hubs
{
    public class EmployeeHub:Hub
    {
        public Dictionary<EmployeeType, int> GetEmployeeStatus()
        {
            return EmployeeStaticData.EmployeeTypes;
        }
    }

    
}
