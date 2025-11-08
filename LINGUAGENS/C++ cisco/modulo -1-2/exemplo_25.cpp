#include <iostream>
#include <cmath>

using namespace std;

int main(void) {

	double vector[] = { 1., 2., 3., 4., 5. };
	int n = sizeof(vector) / sizeof(vector[0]);
	double ArithmeticMean;
	double HarmonicMean;
	double GeometricMean;
	double RootMeanSquare;

	double sum = 0, sumrev = 0, prod = 1, sumsq = 0;

	// iterate thru whole vector
	for(int i = 0; i < n; i++) {
		
		// for the arithmetic mean
		sum    += vector[i];	
		
		// for the harmonic mean
		sumrev += 1 / vector[i];

		// for the geometric mean
		prod   *= vector[i];

		// for the root mean square
		sumsq  += vector[i] * vector[i];
	}

	// final calculations
	ArithmeticMean = sum / n;
	HarmonicMean   = n / sumrev;
	GeometricMean  = pow(prod, 1./n);
	RootMeanSquare = sqrt(sumsq / n);

	cout << "Arithmetic Mean = " << ArithmeticMean << endl;
	cout << "Harmonic Mean   = " << HarmonicMean   << endl;
	cout << "Geometric Mean  = " << GeometricMean  << endl;
	cout << "RootMean Square = " << RootMeanSquare << endl;

	cout << endl;
	return 0;
}