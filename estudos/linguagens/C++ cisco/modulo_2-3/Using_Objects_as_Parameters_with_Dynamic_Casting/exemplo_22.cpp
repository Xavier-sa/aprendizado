#include <iostream>
#include <string>

class StringValidator
{
public:
  virtual ~StringValidator() {};
  virtual bool isValid(std::string input) = 0;
};

class MinLengthValidator : public StringValidator {
public:
  MinLengthValidator(size_t min_length): min_length(min_length) {}
  virtual bool isValid(std::string input);
private:
  size_t min_length;
};

bool MinLengthValidator::isValid(std::string input)
{
  return (input.length() >= min_length);
}

class PatternValidator : public StringValidator {
public:
  PatternValidator(std::string pattern): pattern(pattern) {}
  virtual bool isValid(std::string input);
private:
  std::string pattern;
  bool chars_match(int pattern_char, int text_char);
  size_t find_match(std::string const &input);
};

bool PatternValidator::chars_match(int pattern_char, int text_char)
{
  // The letter 'D' will match any decimal digit
  if (pattern_char == 'D')
  {
    return isdigit(text_char);
  }
  // The letter 'A' will match any upper case character of the english alphabet
  if (pattern_char == 'A')
  {
    return isupper(text_char);
  }
  // The letter 'a' will match any lower case character of the english alphabet
  if (pattern_char == 'a')
  {
    return islower(text_char);
  }
  // The character '?' will match any punctuation
  if (pattern_char == '?')
  {
    return ispunct(text_char);
  }
  return false;
}

size_t PatternValidator::find_match(std::string const &text)
{
  size_t match_pos = std::string::npos;

  size_t len_pattern = pattern.length();
  if (len_pattern == 0)
  {
    return match_pos;
  }

  for (size_t idx_text = 0;
       match_pos == std::string::npos && idx_text + len_pattern <= text.length();
       idx_text++)
  {
    bool all_match = true;
    for (size_t idx_pattern = 0; all_match && idx_pattern < len_pattern; idx_pattern++)
    {
      all_match = chars_match(pattern[idx_pattern], text[idx_text + idx_pattern]);
    }
    if (all_match)
    {
      match_pos = idx_text;
    }
  }

  return match_pos;
}

bool PatternValidator::isValid(std::string input)
{
  return find_match(input) != std::string::npos;
}

using namespace std;

class PasswordValidator : public StringValidator {
public:
  PasswordValidator();
  virtual bool isValid(std::string input);
private:
  MinLengthValidator lengthValidator;
  PatternValidator lowerValidator;
  PatternValidator upperValidator;
  PatternValidator digitValidator;
  PatternValidator punctValidator;
};

PasswordValidator::PasswordValidator():
  lengthValidator(8),
  lowerValidator("a"),
  upperValidator("A"),
  digitValidator("D"),
  punctValidator("?")
{}

bool PasswordValidator::isValid(std::string input)
{
  return lengthValidator.isValid(input)
      && lowerValidator.isValid(input)
      && upperValidator.isValid(input)
      && digitValidator.isValid(input)
      && punctValidator.isValid(input);
}

void printValid(StringValidator &validator, string input)
{
  cout << "The string '" << input << "' is "
       << (validator.isValid(input) ? "valid" : "invalid") << endl;
}


int main()
{
  PasswordValidator validator;
  printValid(validator, "P4ssw[]rd");
  printValid(validator, "qwerty");
  cout << endl;

  return 0;
}