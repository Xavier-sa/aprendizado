#include <iostream>
#include <string>

using namespace std;

class Square
{
public:
  Square(double side);
  void set_side(double new_side);
  double get_area() { return side; }
  double get_side() { return area; }
private:
  double    side;
  double    area;
};

void Square::set_side(double new_side)
{
  if (new_side >= 0)
  {
    side = new_side;
    area = side * side;
  }
}

Square::Square(double side)
{
  this->side = side;
  this->area = side * side;
}

void print(Square* square)
{
  cout << "Square: side=" << square->get_side() << " area=" << square->get_area() << endl;
}

int main()
{
  Square s(4);

  print(&s);

  s.set_side(2.0);
  print(&s);

  s.set_side(-33.0);
  print(&s);

  return 0;
}