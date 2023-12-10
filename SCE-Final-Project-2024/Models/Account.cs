using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SCE_Final_Project_2024.Models {
    public class Account {
        [Key]
        [Range(1000, 9999, ErrorMessage = "Account ID must be between 1000 and 9999")]
        public int _AccountID { get; set; }

        [StringLength(50, 
            ErrorMessage = "First name must be at most 50 characters long")]
        public string _FName { get; set; } = "none";
        [StringLength(50, ErrorMessage = "Last name must be at most 50 characters long")]

        public string _LName { get; set; } = "none";

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address")]
        public string _Email { get; set; } 

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,20}$",
            ErrorMessage = "Password must have at least one letter, one number, and one special character and be betweeb 6 and 20 characters long")]
        public string _Password { get; set; }

        public string _Department { get; set; }

        [RegularExpression(@"\b\d{9}\b", ErrorMessage = "Israeli ID must be a 9-digit number")]
        public string _IsraeliID {
            get => _IsraeliID;
            set {
                if (IsValidIsraeliID(value)) {
                    _IsraeliID = value;
                }
                else {
                    throw new ArgumentException("Israeli ID must be a valid 9-digit number following the Luhn 10 checksum.");
                }
            }
        }

        public bool _IsVerfied { get; set; } = false;
        public bool _IsStaff { get; set; } = false;
        public Account() { }

        public Account(string email, string password, string department, bool isStaff) {
            _AccountID = GenerateRandomAccountID();
            _Email = email;
            _Password = password;
            _Department = department;
            _IsStaff = isStaff;
        }
        private int GenerateRandomAccountID() { // Creates a random number to act as a key for the account in the database
            Random random = new Random();
            return random.Next(1000, 10000);
        }

        private bool IsValidIsraeliID(string id) { // Uses Luhn algorithm to verify the ID is valid Israeli ID
            if (!Regex.IsMatch(id, @"\b\d{9}\b")) return false;
            int[] digits = id.Select(c => int.Parse(c.ToString())).ToArray();
            for (int i = digits.Length - 2; i >= 0; i -= 2) {
                digits[i] *= 2;
                if (digits[i] > 9) digits[i] -= 9;
            }
            int sum = digits.Sum();
            return sum % 10 == 0;
        }
    }
}
