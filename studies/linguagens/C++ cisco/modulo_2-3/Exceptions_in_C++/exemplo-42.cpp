#include <iostream>
#include <stdexcept>

using namespace std;
class ValueLimitsException:public runtime_error
{
public:
	ValueLimitsException(const char * message): runtime_error(message){}
};


class Number
{
public:

	Number(int value, int min, int max)
		: value(value), min(min), max(max) {}
	void addValue(int v)
	{
		if (value + v > max)
			throw ValueLimitsException("Value could exceed limit.");
		value += v;
	}
	void subValue(int v)
	{
		if (value - v < min)
			throw ValueLimitsException("Value could exceed limit.");
		value -= v;
	}
	void print() const
	{
		cout << value << endl;
	}
private:
	int value, min, max;
};

int main(void) {
	int v, min, max;
	cin >> v;
	cin >> min;
	cin >> max;
	Number numberFive(v, min, max);

	cin >> v;
	cin >> min;
	cin >> max;
	Number numberNine(v, min, max);

	try
	{
		int val;
		cin >> val;
		numberFive.addValue(val);
	}
	catch (ValueLimitsException ex)
	{
		cout << ex.what() << endl;
	}
	try
	{
		int val;
		cin >> val;
		numberNine.addValue(val);
	}
	catch (ValueLimitsException ex)
	{
		cout << ex.what() << endl;
	}
	try
	{
		int val;
		cin >> val;
		numberFive.subValue(val);
	}
	catch (ValueLimitsException ex)
	{
		cout << ex.what() << endl;
	}
	numberFive.print();
	numberNine.print();
	return 0;
}