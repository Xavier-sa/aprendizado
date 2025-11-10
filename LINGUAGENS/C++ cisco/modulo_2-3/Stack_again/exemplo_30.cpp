int Fraction::LCM(int x, int y) {
	int i = y;
	while(y % x)
		y += i;
	return y;
}

int Fraction::GCD(int x, int y) {
	for(;;)  {
		x %= y;
		if(!x)
			return y;
		y %= x;
		if(!y)
			return x;
	}
}