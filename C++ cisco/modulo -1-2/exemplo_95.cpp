#include <iostream>
#include <string>

using namespace std;

class Piece
{
public:
	virtual bool isMovePossible(string from, string to) { return false; };
protected:
	static bool isnumberInRange(int number)
	{
		return number <= '8' && number >= '1';
	}

	static bool isLetterInRange(char letter)
	{
		return letter <= 'h' && letter >= 'a';
	}

};

class King :public Piece
{
public:
	bool isMovePossible(string from, string to);
};

bool King::isMovePossible(string from, string to)
{
	bool isPossible = false;
	if (from.length()==2 && to.length()==2)
	{
		char letterFrom = from[0];
		char numberFrom = from[1];
		char letterTo = to[0];
		char numberTo =to[1];
		if (abs(letterFrom - letterTo) == abs(numberFrom- numberTo) )
		{
			if (isnumberInRange(numberFrom) && isLetterInRange(letterFrom))
			{
				if (isnumberInRange(numberTo) && isLetterInRange(letterTo))
				{
					isPossible = true;
				}
			}
		}
	}
	return isPossible;
}

class Man:public Piece
{
public:
	bool isMovePossible(string from, string to)
	{
		bool isPossible = false;
		if (from.length() == 2 && to.length() == 2)
		{
			char letterFrom = from[0];
			char numberFrom = from[1];
			char letterTo = to[0];
			char numberTo = to[1];
			if (abs(letterFrom - letterTo) == abs(numberFrom - numberTo) && abs(numberFrom - numberTo) == 1)
			{
				if (isnumberInRange(numberFrom) && isLetterInRange(letterFrom))
				{
					if (isnumberInRange(numberTo) && isLetterInRange(letterTo))
					{
						isPossible = true;
					}
				}
			}
		}
		return isPossible;
	}
};

int main()
{
	Piece *pieces[3];
	pieces[0] = new Man();
	pieces[1] = new King();
	pieces[2] = new Man();
	cout.setf(ios::boolalpha);
	cout << pieces[0]->isMovePossible("b1", "c2") << endl;
	cout << pieces[1]->isMovePossible("b1", "d3") << endl;
	cout << pieces[2]->isMovePossible("b1", "d3") << endl;
	return 0;
}