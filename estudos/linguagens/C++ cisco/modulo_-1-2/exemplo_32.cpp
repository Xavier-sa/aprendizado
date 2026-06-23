#include <iostream>
#include <string>

using std::string;

class ShopItemOrder
{
public:
  ShopItemOrder(string name, double price, int number = 1):
    name(name), unit_price(price), num_of_items(number) {}
  string get_name()             { return name; }
  double get_unit_price()       { return unit_price; }
  int    get_number_of_items()  { return num_of_items; }
  double get_total_price()      { return unit_price * num_of_items; }
  void set_name(string new_name) {
    name = new_name;
  }
  void set_unit_price(double new_unit_price) {
    if (new_unit_price > 0) { unit_price = new_unit_price; }
  }
  void set_number_of_items(int new_number_of_items) {
    if (new_number_of_items > 0) { num_of_items = new_number_of_items; }
  }
private:
  string name;
  double unit_price;
  int    num_of_items;
};

int main()
{
  ShopItemOrder orderTShirts("T-shirt mens black size M", 23.4, 3);
  ShopItemOrder orderJeans("Jeans mens blue size M", 42.2, 2);

  std::cout << orderTShirts.get_number_of_items() << " x \""
            << orderTShirts.get_name() << "\" = "
            << orderTShirts.get_total_price() << std::endl;

  std::cout << orderJeans.get_number_of_items() << " x \""
            << orderJeans.get_name() << "\" = "
            << orderJeans.get_total_price() << std::endl;
  return 0;
}