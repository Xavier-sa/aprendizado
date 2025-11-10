#include <iostream>
#include <string>

using namespace std;

class Fraction{
public:
  Fraction(int numerator, int denominator);
  string toString();
  double toDouble();
  // ...
  bool isGreaterThan(Fraction that);
  bool isLessThan(Fraction that);
  bool isEqual(Fraction that);
private:
  int numerator;
  int denominator;
  void reduce();
};

Fraction::Fraction(int numerator, int denominator):
  numerator(numerator), denominator(denominator)
{
  if (denominator == 0)
  {
    denominator = 1;
  }
}

string Fraction::toString()
{
  reduce();
  string result = (numerator * denominator > 0) ? "" : "-";
  int wholes = abs(numerator) / abs(denominator);
  int parts = abs(numerator) % abs(denominator);

  if (parts == 0 && wholes == 0)
  {
    result = "0";
  }
  else
  {
    if (wholes > 0) {
      result += std::to_string(wholes);
    }

    if (wholes > 0 && parts > 0) {
      result += ' ';
    }

    if (parts > 0)
    {
      result += std::to_string(abs(parts)) + '/'
              + std::to_string(abs(denominator));
    }
  }
  return result;

}

double Fraction::toDouble()
{
  return double(numerator) / denominator;
}

bool Fraction::isGreaterThan(Fraction that)
{
  reduce();
  that.reduce();
  return toDouble() > that.toDouble();
}
bool Fraction::isLessThan(Fraction that)
{
  reduce();
  that.reduce();
  return toDouble() < that.toDouble();
}
bool Fraction::isEqual(Fraction that)
{
  reduce();
  that.reduce();
  return this->numerator == that.numerator
      && this->denominator == that.denominator;
}

void Fraction::reduce()
{
  int gcd = denominator;
  int b = numerator;
  while (b != 0)
  {
    int next_b = gcd % b;
    gcd = b;
    b = next_b;
  }

  numerator /= gcd;
  denominator /= gcd;
}

Fraction read_fraction()
{
  int num, den;
  std::string input = "";
  std::getline(cin, input);

  if (2 != sscanf(input.c_str(), "%d / %d", &num, &den))
  {
    cout << "Unrecognized input format" << endl;
  }
  return Fraction(num, den);
}

int main(void) {
  Fraction f1 = read_fraction();
  Fraction f2 = read_fraction();

  if (f1.isGreaterThan(f2))
  {
    cout << f1.toString() << " > " << f2.toString() << endl;
  }
  if (f1.isLessThan(f2))
  {
    cout << f1.toString() << " < " << f2.toString() << endl;
  }
  if (f1.isEqual(f2))
  {
    cout << f1.toString() << " = " << f2.toString() << endl;
  }

	return 0;
}