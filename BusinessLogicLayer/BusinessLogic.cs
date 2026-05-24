using BusinessLogicLayer;
using DataAccessLayer;
using DataAccessLayer.Models;


namespace BusinessLogicLayer
{
    public class BusinessLogic : IBusinessLogic
    {
        private readonly IDataAccess dl;

        public BusinessLogic(IDataAccess _dl) 
        {
            dl = _dl;
        }

        public List<Student> GetStudents() 
        {
            List<Student> students = dl.GetStudents();
            return students;
        } 
    }
}
