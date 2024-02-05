using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;

namespace SCE_Final_Project_2024.Areas.Documents.Pages
{
    public class CreateDocsModel : PageModel
    {
        private readonly IWebHostEnvironment hostingEnv;

        public CreateDocsModel(IWebHostEnvironment env)
        {
            hostingEnv = env;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        public class RichTextEditorValue
        {
            public string Text { get; set; }
        }
        public IActionResult OnPostSave([FromBody] RichTextEditorValue value)
        {
            try
            {
                string rootPath = Path.Combine(hostingEnv.WebRootPath, "js", "data.txt");
                Console.WriteLine("OnPostSave method called. Text: " + value.Text);

                using (StreamWriter writeFile = new StreamWriter(rootPath, true))
                {
                    writeFile.WriteLine(value.Text);
                }

                return Page();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in OnPostSave: " + ex.Message);
                return BadRequest(); // Return a 400 status on error
            }
        }

    }
}
