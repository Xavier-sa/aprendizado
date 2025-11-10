#include <iostream>
#include <string>

using namespace std;

class IPAddress
{
public:
	IPAddress() : address("") {}
	IPAddress(const string address) : address(address) {}
	IPAddress(const IPAddress& other) : address(other.address) {}
	IPAddress& operator=(const IPAddress& source)
	{
		if (this == &source)
			return *this;
		address = source.address;
		return *this;
	}

	string getAddress()
	{
		return address;
	}
	void setAddress(string address)
	{
		this->address=address;
	}
	void print()
	{
		cout << address << endl;
	}
private:
	string address;
};

class IPNetwork
{
public:
	IPNetwork(const string& name) : name(name), addressCount(0)
	{}
	void addAddress(IPAddress address)
	{
		addresses[addressCount] = address;
		addressCount++;
	}
	
	void print()
	{
		cout << name << ":" << endl;
		for (int i = 0; i < addressCount; i++)
			addresses[i].print();
	}
private:
	string name;
	int addressCount;
	IPAddress addresses[255];
	//student can do it with dynamic memory allocation ie. IPAddress *addresses; 
	//or with vector (not mentioned in this course)
};


int main()
{
	string inputData;
	IPNetwork network1("Network 1");
	IPNetwork network2("Network 2");
	cout << "Input 1st IP address" << endl;
	cin >> inputData;
	//inputData = "1.1.1.1";//LEFT intentionally - for clarification
	network1.addAddress(IPAddress(inputData));

	cout << "Input 2nd IP address" << endl;
	cin >> inputData;
	//inputData = "2.2.2.2";
	network1.addAddress(IPAddress(inputData));

	cout << "Input 3rd IP address" << endl;
	cin >> inputData;
	//inputData = "3.3.3.3";
	IPAddress address(inputData);
	network1.addAddress(address);
	network2.addAddress(address);

	cout << "Input 4th IP address" << endl;
	cin >> inputData;
	//inputData = "4.4.4.4";
	network2.addAddress(IPAddress(inputData));

	cout << "Input 5th IP address" << endl;
	cin >> inputData;
	//inputData = "5.5.5.5";
	network2.addAddress(IPAddress(inputData));

	network1.print();
	network2.print();

	cout << endl;
	return 0;
}