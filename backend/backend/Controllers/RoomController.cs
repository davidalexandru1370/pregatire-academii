using backend.Model;
using backend.Model.DTOs;
using backend.Repository;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private IRoomService _roomService;
        private IQuizService _quizService;

        public RoomController(IRoomService roomService, IQuizService quizService)
        {
            _roomService = roomService;
            _quizService = quizService;
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

        public async Task<ActionResult<QuizResponseDTO>> EvaluateQuiz([FromBody] QuizResponseDTO quiz)
        {
            try
            {
                int score = _roomService.EvaluateQuiz(quiz.Answers).Result;
                Guid userId = (Guid)HttpContext.Items["userId"]!;
                await _roomService.AddEvaluatedQuizToUser(userId, quiz.Id, quiz.Score ?? 0);
                return Ok(quiz);
            }
            catch (RepositoryException repositoryException)
            {
                return BadRequest(repositoryException.Message);
            }
        }
    }
}
