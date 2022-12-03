using backend.Model;
using backend.Repository;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class RoomService : IRoomService
    {
        IUserRepository _userRepository;
        IRoomRepository _roomRepository;

        public RoomService(IUserRepository userRepository, IRoomRepository roomRepository)
        {
            _userRepository = userRepository;
            _roomRepository = roomRepository;
        }

        public async Task<Room> AddRoom(Guid userId, Guid quizId)
        {
            Room room = new Room
            {
                UserId = userId,
                QuizId = quizId,
                IssuedRoomDate = DateTime.Now
            };

            try
            {
                room.IssuedRoomDate = DateTime.Now;
                await _roomRepository.Add(room);
            }
            catch (RepositoryException)
            {
                throw;
            }

            return room;
        }

        public Task<Quiz> GetActiveUserQuiz(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateQuiz(Guid userId, Quiz newQuiz)
        {
            throw new NotImplementedException();
        }
    }
}