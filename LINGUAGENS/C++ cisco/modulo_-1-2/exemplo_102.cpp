#include <iostream>
#include <iomanip>
#include <string>

int main()
{
  float v1=2.3;
  float v2=2.3;
  float v3=2.123456;
  float v4=2.123456;
  float v5=2.123456;
  std::cout << std::setprecision(2) << v1 << std::endl;
  std::cout << std::setprecision(2) << std::fixed << v2 << std::endl;
  std::cout << std::setprecision(6) << v3 << std::endl;
  std::cout << std::setprecision(2) << v4 << std::endl;
  std::cout << std::setprecision(0) << v5 << std::endl;
  return 0;
}