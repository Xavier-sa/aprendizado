Fraction& Fraction::operator+=(Fraction arg) {
	int common_denom = LCM(denominator, arg.denominator);
	int numera = numerator * common_denom / denominator + 
		     arg.numerator * common_denom / arg.denominator;
	numerator   = numera;
	denominator = common_denom;
	return *this;
}