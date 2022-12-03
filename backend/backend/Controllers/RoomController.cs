using backend.Model;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost]
        [Route("/start_room")]
        public async Task<IActionResult> StartRoom(Guid quizId)
        {
            if (quizId == Guid.Empty)
            {
                return BadRequest("Invalid quiz");
            }

            Guid userId = (Guid)HttpContext.Items["userId"]!;

            var room = _roomService.AddRoom(new Room
            {
                QuizId = quizId,
                UserId = userId
            });

            return Ok();
        }
    }
}
