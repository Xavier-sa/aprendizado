Fraction::Fraction() : numerator(0), denominator(1) {
};

Fraction::Fraction(int n) : numerator(n), denominator(1) {
};

Fraction::Fraction(int n,int d) throw(domain_error) : numerator(n), denominator(d) {
	if(denominator == 0)
		throw domain_error("bad fraction");
};