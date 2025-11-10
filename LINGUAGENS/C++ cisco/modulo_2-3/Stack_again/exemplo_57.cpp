#include <iostream>
#include <string>

using namespace std;

enum DayOfWeek
{
	Monday = 0,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
};
enum MonthName
{
	January=1,
	February,
	March,
	April,
	May,
	June,
	July,
	August,
	September,
	October,
	November,
	December
};
string days[] = {
	"Monday","Tuesday", "Wednesday", "Thursday",
	"Friday", "Saturday","Sunday"};

struct stackElement
{
	double value;
	stackElement *prev;
};

class Calendar
{
public:

	Calendar(int day, int month, int year)
		: day(day), month(month),  year(year)
	{}

	//this function may seem unnatural for some students
	//its only purpose is to demostrate use of enums
	string monthName() const
	{
		string monthsNames[] =
		{ "None", "january", "february", "march", "april",
			"may", "june", "july", "august",
			"september", "october", "november", "december" };
		string name = "";
		switch (month)
		{
		case 1: name = monthsNames[January];break;
		case 2:	name = monthsNames[February];break;
		case 3:	name = monthsNames[March];break;
		case 4:	name = monthsNames[April];break;
		case 5:	name = monthsNames[May];break;
		case 6:	name = monthsNames[June];break;
		case 7:	name = monthsNames[July];break;
		case 8:	name = monthsNames[August];break;
		case 9:	name = monthsNames[September];break;
		case 10:name = monthsNames[October];break;
		case 11:name = monthsNames[November];break;
		case 12:name = monthsNames[December];break;
		default: break;//student can add her/his own exception
		}


		return name;
	}

	void print()
	{
		dayCount = 0;
		daysSince1970();
		daysInGivenYearMonths();
		dayCount += day - 1;
		cout << day << " " << monthName() << " " << year << " - ";
		switch(dayCount%7)
		{
			case 0:cout << days[Friday];break;
			case 1:cout << days[Saturday];break;
			case 2:cout << days[Sunday];break;
			case 3:cout << days[Monday];break;
			case 4:cout << days[Tuesday];break;
			case 5:cout << days[Wednesday];break;
			case 6:cout << days[Thursday];break;
		}
		cout << " - " << dayCount << " days since 1st January 1970" << endl;
	}

private:
	static bool isLeapYear(int y)
	{
		return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);
	}

	void daysSince1970()
	{
		for (int i = 1970; i < year; i++)
			if (isLeapYear(i))
				dayCount += 366;
			else
				dayCount += 365;

	}
	void daysInGivenYearMonths()
	{
		int months[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		for (int i = 0; i<month - 1; i++)
		{
			if (i == 1 && isLeapYear(year))
				dayCount += 1;
			dayCount += months[i];
		}
		dayCount -= 1;
	}

	int day, month, year;
	int dayCount;
};



int main(void) {
	int day, month, year;
	cin >> day;
	cin >> month;
	cin >> year;
	Calendar calendar(day, month, year);
	//Calendar calendar(13, 3, 2016); // LEFT intentionally - for clarification
	calendar.print();
	return 0;
}