using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySQL_API.Service;
using MySQL_API.Models;
using BusinessLogicLayer;

namespace MySQL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IBusinessLogic BLService;
        public StudentController(IBusinessLogic _BLService)
        {
            BLService = _BLService;
        }

        [HttpGet("GetStudent")]
        public IActionResult Get()
        {
            var students = BLService.GetStudents();
            return Ok(students);
        }
    }
}
