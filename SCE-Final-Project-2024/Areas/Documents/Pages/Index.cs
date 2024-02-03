// Razor Pages Model
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging; // Add this
using SCE_Final_Project_2024.Areas.Documents.Data;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.IO;

namespace SCE_Final_Project_2024.Areas.Documents.Pages
{
    public class CreateDocsModel : PageModel
    {
        private readonly DocsContext _context;
        private readonly ILogger<CreateDocsModel> _logger; // Add this

        [BindProperty]
        public string DocumentContent { get; set; }

        public CreateDocsModel(DocsContext context, ILogger<CreateDocsModel> logger) // Add ILogger in the constructor
        {
            _context = context;
            _logger = logger; // Initialize logger
        }

        public IActionResult OnPostSaveDocument()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Log statements
                    _logger.LogInformation("ModelState is valid.");
                    _logger.LogInformation($"DocumentContent length: {DocumentContent.Length}");

                    // Convert rich text content to Word document
                    byte[] wordDocumentBytes = ConvertToWordDocument(DocumentContent);
                    _logger.LogInformation($"Word document bytes length: {wordDocumentBytes.Length}");

                    // Save Word document bytes to the database
                    try
                    {
                        var newDocument = new Docs
                        {
                            DocumentContent = wordDocumentBytes
                        };

                        _context.Docs.Add(newDocument);
                        _context.SaveChanges();

                        TempData["SuccessMessage"] = "Document saved successfully.";

                        return RedirectToPage("/Index");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Database save error: {ex.Message}");
                        TempData["ErrorMessage"] = $"Failed to save document to the database. Error: {ex.Message}";
                        return Page();
                    }
                }

                TempData["ErrorMessage"] = "Invalid ModelState.";
                return Page();
            }
            catch (Exception ex)
            {
                _logger.LogError($"General error: {ex.Message}");
                TempData["ErrorMessage"] = $"Failed to save document. Error: {ex.Message}";
                return Page();
            }
        }

        private byte[] ConvertToWordDocument(string richTextContent)
        {
            using (MemoryStream memStream = new MemoryStream())
            {
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Create(memStream, WordprocessingDocumentType.Document))
                {
                    MainDocumentPart mainPart = wordDoc.AddMainDocumentPart();
                    mainPart.Document = new Document(new Body(new Paragraph(new Run(new Text(richTextContent)))));
                }
                return memStream.ToArray();
            }
        }
    }
}
