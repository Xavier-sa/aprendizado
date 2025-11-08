Fraction Fraction::operator/(Fraction arg) throw(domain_error) {
	if(arg.numerator == 0)
		throw domain_error("division by zero");
	int numera = numerator * arg.denominator;
	int denomi = denominator * arg.numerator;
	Fraction f(numera, denomi);
	return !f;
}