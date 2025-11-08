string Fraction::GetString(void) {
	ostringstream os;
	os << "[" << numerator << "/" << denominator << "]";
	return os.str();
}

double Fraction::GetValue(void) {
	return double(numerator) / double(denominator);
}