using Microsoft.AspNetCore.Mvc;

namespace SignalR.Controllers
{
    public class PartyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
