#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

class Point
{
private:
	int x, y;
public:
	Point(int x, int y):x(x), y(y){}
	double get_distance_from(int other_x, int other_y) const
	{
		int diff_x = x - other_x;
		int diff_y = y - other_y;
		double distance = sqrt(diff_x * diff_x + diff_y * diff_y);
		return distance;
	}
	friend void print(const Point & value);

};

void print(const Point & value)
{
	cout << value.x << " " << value.y << endl;//Note: it can be done in many ways
}

bool ascending_compare(const Point & lhs, const Point & rhs)
{
	return lhs.get_distance_from(0, 0) < rhs.get_distance_from(0,0);
}

int main()
{
	vector <Point> points = { {1, 2}, {3, 5}, {2, 2} };
	for_each(points.begin(), points.end(), print); cout << endl;

	stable_sort(points.begin(), points.end(), ascending_compare);
	for_each(points.begin(), points.end(), print); cout << endl;

	return 0;
}
