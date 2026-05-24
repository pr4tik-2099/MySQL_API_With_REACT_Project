using MySQL_API.Models;

namespace MySQL_API.Service
{
    public interface IStudentService
    {
        List<Student> GetStudents();

    }
}