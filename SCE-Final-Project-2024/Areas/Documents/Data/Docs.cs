using System.ComponentModel.DataAnnotations;

namespace SCE_Final_Project_2024.Areas.Documents.Data
{
    public class Docs
    {
        [Key]
        public int Id { get; set; }

        public byte[] DocumentContent { get; set; }
    }
}
