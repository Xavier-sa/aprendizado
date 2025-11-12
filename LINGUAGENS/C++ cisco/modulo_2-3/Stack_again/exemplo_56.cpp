#include <iostream>

using namespace std;

enum weekday {SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY};

weekday operator+(weekday day, int days) {
	return weekday((int(day) + days) % 7);
}

ostream& operator<< (ostream &strm, weekday day) {
	switch(int(day)) {
	case SUNDAY:    strm << "SUNDAY"; break;
	case MONDAY:    strm << "MONDAY"; break;
	case TUESDAY:   strm << "TUESDAY"; break;
	case WEDNESDAY: strm << "WEDNESDAY"; break;
	case THURSDAY:  strm << "THURSDAY"; break;
	case FRIDAY:    strm << "FRIDAY"; break;
	case SATURDAY:  strm << "SATURDAY"; break;
	default:        strm << "Somewhere inside the depths of time..."; break;
	}
	return strm;
}

int main(void) {
	weekday d = SATURDAY;
	d = d + 16;
	cout << d << endl;
	return 0;
}