#include <iostream>

using namespace std;
class Matrix2x2
{
public:
	Matrix2x2(double v1, double v2, double v3, double v4)
	{
		v[0][0] = v1;
		v[0][1] = v2;
		v[1][0] = v3;
		v[1][1] = v4;
	}

	void addValue(const double& rhs)
	{
		switch(lastAdded)
		{
		case 0:v[0][0] = rhs;break;
		case 1:v[0][1] = rhs;break;
		case 2:v[1][0] = rhs;break;
		case 3:v[1][1] = rhs;break;
		}
		lastAdded++;
		if (lastAdded > 4)
			lastAdded = 0;
	}

	void operator<<(const double& rhs) 
	{
		addValue(rhs);
	}
	void print(ostream &os) const
	{
		os << v[0][0] << " " << v[0][1] << endl;
		os << v[1][0] << " " << v[1][1] << endl;
	}
private:
	int lastAdded = 0;
	double v[2][2];
};


istream& operator>>(istream& is, Matrix2x2& rhs)
{
	double value;
	is >> value;
	rhs.addValue(value);
	return is;
}


ostream& operator<<(ostream& os, const Matrix2x2& rhs)
{
	rhs.print(os);
	return os;
}

int main(void) {
	Matrix2x2 m(1, 5.5, 6, 9);
	//m << 3;//LEFT intentionally - for clarification
	//m << 4;
	//m << 5;
	//m << 6;
	cin >> m;
	cin >> m;
	cin >> m;
	cin >> m;
	cout << m;
	
	return 0;
}