using System.Runtime.Serialization;

namespace backend.Constants
{    
        public enum AuthErrors
        {
            [EnumMember(Value = "Adresa de email este deja inregistrata!")]
            emailTaken,

            [EnumMember(Value = "Parola este incorecta!")]
            wrongPassword,

            [EnumMember(Value = "Adresa de email sau parola sunt gresite!")]
            EmailOrPasswordWrong
        }
    }