#include <iostream>
#include <exception>
#include <stdexcept>

using namespace std;
class MatricesSizeException:public runtime_error
{
public:
	MatricesSizeException(const char * message): runtime_error(message){}
};

class Matrix
{
public:
	Matrix(const Matrix& other)
		: x(other.x), y(other.y), values(other.values){}

	Matrix& operator=(const Matrix& other)
	{
		if (this == &other)
			return *this;
		x = other.x;
		y = other.y;
		values = other.values;
		return *this;
	}


	Matrix(int x, int y) : x(x), y(y)
	{
		values = new float*[y];
		for (int i = 0; i < y; i++)
			values[i] = new float[x];
	}

	void fill(float **vals)
	{
		for (int xi = 0; xi < x; xi++)
		{
			for (int yi = 0; yi < y; yi++)
				values[yi][xi] = vals[yi][xi];
		}
	}

	void addValue(int value)
	{
		for (int xi = 0; xi < x; xi++)
		{
			for (int yi = 0; yi < y; yi++)
				values[yi][xi] += value;
		}
	}

	void addMatrix(Matrix &other)
	{
		if (other.x != x || other.y != y)
			throw MatricesSizeException("Matrixes don't fit.");
		for (int xi = 0; xi < x; xi++)
		{
			for (int yi = 0; yi < y; yi++)
				values[yi][xi] += other.values[yi][xi];
		}
	}

	void print() const
	{
		for (int xi = 0; xi < x; xi++)
		{
			for (int yi = 0; yi < y; yi++)
				cout << values[yi][xi] << " ";
			cout << endl;
		}

	}
private:
	int x, y;
	float **values;
};

int main(void) {
	float **values;
	values = new float*[3];
	for (int i = 0; i < 3; i++)
	{
		values[i] = new float[3];
		for (int j = 0; j < 3; j++)
		{
			values[i][j] = 0;
		}
	}

	float m1x, m1y, m2x, m2y, m3x, m3y;
	cin >> m1x;
	cin >> m1y;
	cin >> m2x;
	cin >> m2y;
	cin >> m3x;
	cin >> m3y;
	Matrix m1(m1x, m1y);
	m1.fill(values);
	Matrix m2(m2x, m2y);
	m2.fill(values);
	Matrix m3(m3x, m3y);
	m3.fill(values);
	try
	{
		m1.addMatrix(m2);
		m1.print();
	}
	catch (MatricesSizeException ex)
	{
		cout << ex.what() << endl;
	}
	try
	{
		m1.addMatrix(m3);
		m1.print();
	}
	catch (MatricesSizeException ex)
	{
		cout << ex.what() << endl;
	}
	try
	{
		m2.addMatrix(m3);
		m2.print();
	}
	catch (MatricesSizeException ex)
	{
		cout << ex.what() << endl;
	}
	return 0;
}