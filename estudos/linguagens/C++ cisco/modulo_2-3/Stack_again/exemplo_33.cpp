Fraction Fraction::operator!(void) {
	int gcd = GCD(numerator, denominator);
	return Fraction(numerator / gcd, denominator / gcd);
}