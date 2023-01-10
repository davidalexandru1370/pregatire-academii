using backend.Exceptions;
using backend.Model;
using backend.Repository;
using backend.Services.Interfaces;
using HotChocolate.Language;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RoomService : IRoomService
    {
        IUserRepository _userRepository;
        IRoomRepository _roomRepository;
        IQuizRepository _quizRepository;
        IAnswerRepository _answerRepository;
        IQuizStatisticsRepository _quizStatisticsRepository;

        public RoomService(
            IUserRepository userRepository,
            IRoomRepository roomRepository,
            IQuizRepository quizRepository,
            IAnswerRepository answerRepository,
            IQuizStatisticsRepository quizStatisticsRepository)
        {
            _userRepository = userRepository;
            _roomRepository = roomRepository;
            _quizRepository = quizRepository;
            _answerRepository = answerRepository;
            _quizStatisticsRepository = quizStatisticsRepository;
        }

        public async Task<Room> AddRoom(Guid userId, Guid quizId)
        {
            try
            {
                await _userRepository.GetById(userId);
                await _quizRepository.GetQuizById(quizId);
            }
            catch (RepositoryException)
            {
                throw;
            }

            Room room = new Room
            {
                UserId = userId,
                QuizId = quizId,
                IssuedRoomDate = DateTime.Now.ToUniversalTime()
            };

            try
            {
                await _roomRepository.Add(room);
            }
            catch (RepositoryException)
            {
                throw;
            }

            return room;
        }

        public Task<IEnumerable<Answer>> EvaluateQuiz(IEnumerable<Answer> answers)
        {
            int totalScore = 0;
            var answersWithCorrectField = ((Task<IEnumerable<Answer>>)answers.Select(async (answer) =>
            {
                var query = await _answerRepository.GetAnswerById(answer.Id);
                totalScore += query.IsCorrect is true ? 10 : 0;
                return query;
            }));

            return answersWithCorrectField;
        }

        public async Task addEvaluatedQuizToUser(Guid userId, Guid quizId, int score)
        {
            try
            {
                await _quizStatisticsRepository.AddSample(new QuizStatistics
                {
                    QuizId = quizId,
                    UserId = userId,
                    Score = score,
                });
            }
            catch (Exception exception)
            {
                throw new InvalidEntityException(exception.Message);
            }
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