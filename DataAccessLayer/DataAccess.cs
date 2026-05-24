using System.Data;
using MySql.Data.MySqlClient;
using MySql.Data;
using DataAccessLayer.Models;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace DataAccessLayer
{
    public class DataAccess : IDataAccess
    {
        private readonly String cs;
        public DataAccess(IConfiguration _cs) 
        {
            // cs = "Server=localhost:3306;Database=svu_db;User=root;Password=pratik2099;";
            cs = _cs.GetConnectionString("DefaultConnection");

        }
        public List<Student> GetStudents()
        {
            List<Student> students = new List<Student>();
            MySqlConnection con = new MySqlConnection(cs);
            MySqlCommand cmd = new MySqlCommand();

            con.Open();

            string query = "SELECT * FROM student";
            cmd = new MySqlCommand(query, con);
            cmd.CommandType = CommandType.Text;
            var dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Student st = new Student();
                st.Id = Convert.ToInt32(dr["s_Id"].ToString());
                st.FirstName = dr["s_FirstName"].ToString();
                st.LastName = dr["s_LastName"].ToString();
                st.Email = dr["s_Email"].ToString();
                st.Number = dr["s_Number"].ToString();

                students.Add(st);
            }
            con.Close();
            return students;
        }
    }
}
