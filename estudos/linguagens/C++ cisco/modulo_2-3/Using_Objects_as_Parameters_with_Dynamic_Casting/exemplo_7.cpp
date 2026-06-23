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

class MaxLengthValidator : public StringValidator {
public:
  MaxLengthValidator(size_t max_length): max_length(max_length) {}
  virtual bool isValid(std::string input);
private:
  size_t max_length;
};

bool MaxLengthValidator::isValid(std::string input)
{
  return (input.length() <= max_length);
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
  // The letter 'A' will match any character of the english alphabet (upper and lower case)
  if (pattern_char == 'A')
  {
    return isalpha(text_char);
  }
  // The character '?' will match every character
  if (pattern_char == '?')
  {
    return true;
  }
  // Lower-case letters in a pattern will match according letters of the English alphabet
  if (islower(pattern_char))
  {
    return pattern_char == tolower(text_char);
  }
  // Any punctuation except '?' will match exactly the same punctuation in a string
  if (ispunct(pattern_char))
  {
    return pattern_char == text_char;
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

void printValid(StringValidator &validator, string input)
{
  cout << "The string '" << input << "' is "
       << (validator.isValid(input) ? "valid" : "invalid") << endl;
}


int main()
{
  cout << "MinLengthValidator" << endl;
  MinLengthValidator min(6);
  printValid(min, "hello");
  printValid(min, "welcome");
  cout << endl;

  cout << "MaxLengthValidator" << endl;
  MaxLengthValidator max(6);
  printValid(max, "hello");
  printValid(max, "welcome");
  cout << endl;

  cout << "PatternValidator" << endl;
  PatternValidator digit("D");
  printValid(digit, "there are 2 types of sentences in the world");
  printValid(digit, "valid and invalid ones");
  cout << endl;

  return 0;
}