using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {

        [HttpPost]
        [Route("/start_room")]
        public void StartRoom(Guid quizId)
        {
            
        }
    }
}
