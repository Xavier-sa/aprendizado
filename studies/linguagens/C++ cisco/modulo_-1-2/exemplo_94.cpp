#include <iostream>

using namespace std;


class BaseTree
{
public:
	virtual void draw() {};
};


class SimpleTree :public BaseTree
{

public:

	void draw()
	{
		cout << " /\\\n";
		cout << "//\\\\\n";
	}

};

class StarTree :public BaseTree
{

public:

	void draw()
	{
		cout << " /\\\n";
		cout << "/**\\\n";
	}

};

class PlusTree :public BaseTree
{

public:

	void draw()
	{
		cout << " /\\\n";
		cout << "/++\\\n";
	}
	
};

int main()
{
	BaseTree *trees[3];
	
	SimpleTree simpleTree;
	StarTree starTree;
	PlusTree plusTree;
	
	trees[0] = &simpleTree;
	trees[1] = &starTree;
	trees[2] = &plusTree;
	
	for (int i = 0; i < 3; i++)
	{
		cout << "Drawing " << i + 1 << ": \n";
		trees[i]->draw();
	}
	return 0;
}