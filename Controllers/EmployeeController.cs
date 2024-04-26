using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Constant;
using SignalR.Data;
using SignalR.Hubs;

namespace SignalR.Controllers
{
   
    [Controller]
    public class EmployeeController : Controller
    {
        private IHubContext<EmployeeHub> employeeHub;
        public EmployeeController(IHubContext<EmployeeHub> employeeHub) {
            this.employeeHub = employeeHub;

        }

        public IActionResult Index()
        {
            return View();
        }

        [Route("api/[controller]/{employeeType}")]
        public async Task<IActionResult> UpdateEmployee(int employeeType)
        {
            
            EmployeeStaticData.EmployeeTypes[employeeType==0?EmployeeType.Permanent:EmployeeType.Contract]++;
            await employeeHub.Clients.All.
                SendAsync("employeeUpdate", EmployeeStaticData.EmployeeTypes[EmployeeType.Permanent], 
                EmployeeStaticData.EmployeeTypes[EmployeeType.Contract]);
            return Accepted();
        }
    }
}
