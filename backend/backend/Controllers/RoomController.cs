using backend.Model;
using backend.Model.DTOs;
using backend.Repository;
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
        [Route("/start-room")]
        public async Task<ActionResult<RoomDTO>> StartRoom([FromBody] Guid quizId)
        {
            if (quizId == Guid.Empty)
            {
                return BadRequest("Invalid quiz");
            }

            Guid userId = (Guid)HttpContext.Items["userId"]!;

            try
            {
                var room = await _roomService.AddRoom(userId, quizId);
                return Ok(new RoomDTO(room.RoomId, room.IssuedRoomDate, room.QuizId));
            }
            catch (RepositoryException repositoryException)
            {
                return BadRequest(repositoryException.Message);
            }
        }
    }
}
