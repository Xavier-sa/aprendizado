#include <iostream>
#include <string>
#include <math.h>

using std::string;
using std::cout;
using std::cin;
using std::endl;

class Fraction{
public:
  Fraction(int numerator, int denominator);
  string toString();
  double toDouble();
  // the functions below do not change the object on which they are called,
  // they produce a new object
  Fraction plus(Fraction that);
  Fraction minus(Fraction that);
  Fraction times(Fraction that);
  Fraction by(Fraction that);
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

Fraction Fraction::times(Fraction that)
{
  int num = this->numerator * that.numerator;
  int den = this->denominator * that.denominator;
  Fraction result(num, den);
  result.reduce();
  return result;
}

Fraction Fraction::by(Fraction that)
{
  int num = this->numerator * that.denominator;
  int den = this->denominator * that.numerator;
  Fraction result(num, den);
  result.reduce();
  return result;
}

Fraction Fraction::plus(Fraction that)
{
  int num = this->numerator * that.denominator
          + that.numerator * this->denominator;
  int den = this->denominator * that.denominator;
  Fraction result(num, den);
  result.reduce();
  return result;
}
Fraction Fraction::minus(Fraction that)
{
  int num = this->numerator * that.denominator
          - that.numerator * this->denominator;
  int den = this->denominator * that.denominator;
  Fraction result(num, den);
  result.reduce();
  return result;
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

  cout << f1.toString() << " + " << f2.toString() << " = " << f1.plus(f2).toString()  << endl;
  cout << f1.toString() << " - " << f2.toString() << " = " << f1.minus(f2).toString() << endl;
  cout << f1.toString() << " * " << f2.toString() << " = " << f1.times(f2).toString() << endl;
  cout << f1.toString() << " / " << f2.toString() << " = " << f1.by(f2).toString()    << endl;
	return 0;
}