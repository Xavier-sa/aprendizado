Fraction Fraction::operator*(Fraction arg) {
	int numera = numerator * arg.numerator;
	int denomi = denominator * arg.denominator;
	Fraction f(numera, denomi);
	return !f;
}