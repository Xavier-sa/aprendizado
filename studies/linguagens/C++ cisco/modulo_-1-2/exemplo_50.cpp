#include <iostream>
#include <string>
#include <math.h>

using namespace std;

class Point2D{
public:
  Point2D(double x, double y): x(x), y(y) {};
  double distanceTo(Point2D that);
private:
  double x;
  double y;
};

Point2D read_point()
{
  double x = 0.0, y = 0.0;
  std::string input = "";
  std::getline(cin, input);

  bool format_ok = (2 == sscanf(input.c_str(), "%lf %lf", &x, &y));
  if (!format_ok)
  {
    format_ok = (2 == sscanf(input.c_str(), "%lf, %lf", &x, &y));
  }

  if (!format_ok)
  {
    cout << "Unrecognized input format" << endl;
  }

  return Point2D(x, y);
}

double Point2D::distanceTo(Point2D that)
{
  double dx = fabs(this->x - that.x);
  double dy = fabs(this->y - that.y);
  return sqrt(dx*dx + dy*dy);
}


int main(void) {
  Point2D p1 = read_point();
  Point2D p2 = read_point();

  cout << p1.distanceTo(p2) << endl;

	return 0;
}