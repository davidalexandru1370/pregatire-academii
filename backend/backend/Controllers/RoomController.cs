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
        [Route("start-room")]
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
                return Ok(new RoomDTO()
                {
                    IssuedRoomDate = room.IssuedRoomDate,
                    QuizId = room.QuizId,
                    RoomId = room.RoomId
                });
            }
            catch (RepositoryException repositoryException)
            {
                return BadRequest(repositoryException.Message);
            }
        }

        public async Task<ActionResult<Answer[]>> EvaluateQuiz([FromBody]Answer[] answers){
            try{
                Answer[] answersWithResults = await _roomService.EvaluateQuiz(answers);
                return Ok(answersWithResults);
            }
            catch(RepositoryException repositoryException){
                return BadRequest(repositoryException.Message);
            }
        }
    }
}
