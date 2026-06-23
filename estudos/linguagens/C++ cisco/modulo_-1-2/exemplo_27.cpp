#include <iostream>
using namespace std;
struct TIME {
	int h;
	int m;
};
int main(void) {
	TIME time;
	int  dur;
	dur = time.h = time.m = -1; 	// set all data to invalid value (to force the while loop to start)
	while(time.h < 0 || time.h > 23) {cout << "Enter hour: ";
		cin >> time.h;
		if(time.h < 0 || time.h > 23)
			cout << "Invalid hour: " << time.h << endl;
	}
	while(time.m < 0 || time.m > 59) {
		cout << "Enter minute: ";
		cin >> time.m;
		if(time.m < 0 || time.h > 59)
			cout << "Invalid minute: " << time.m << endl;
	}
	while(dur < 0) {
		cout << "Enter duration (minutes): ";
		cin >> dur;
		if(dur < 0)
			cout << "Invalid duration: " << dur << endl;
	}
	int hh = dur / 60;		// hours within duration
	int mm = dur % 60;		// remaining minutes
	time.m += mm;			// increment minutes
	time.h += hh;			// increment hours
	time.h += time.m / 60;		// update hours to reflect minutes above 59
	time.m %= 60;			// correct minutes
	time.h %= 24;			// correct hours
	if(time.h < 10)
		cout << 0;
	cout << time.h << ":";
	if(time.m < 10)
		cout << 0;
	cout << time.m << endl;
	return 0;
}