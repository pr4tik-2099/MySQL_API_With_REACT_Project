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
            try
            {
                var students = BLService.GetStudents();
                if (students == null || students.Count == 0)
                {
                    return NotFound(new { message = "No students found" });
                }
                return Ok(new { success = true, data = students });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    new { success = false, message = ex.Message });
            }
        }
    }
}
