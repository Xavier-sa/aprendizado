#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
	string line;
	getline(cin, line);
	stringstream s(line);
	string token;
	while(getline(s, token, ':'))
			cout << token << endl;
	return 0;
}
