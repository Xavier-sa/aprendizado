#include <iostream>

using namespace std;

class FarmAnimal{
public:
  FarmAnimal(double water_consumption);
  double getWaterConsumption();
  // ...
private:
  double water_consumption;
};

FarmAnimal::FarmAnimal(double water_consumption) {
  this->water_consumption = water_consumption;
}

double FarmAnimal::getWaterConsumption() {
  return water_consumption;
}


class DummyAnimal : public FarmAnimal{
public:
  DummyAnimal();
};

DummyAnimal::DummyAnimal() : FarmAnimal(10.0)
{

}


class DoublingAnimal : public FarmAnimal
{
public:
  DoublingAnimal(double given_water_consumption);
};

DoublingAnimal::DoublingAnimal(double given_water_consumption)
: FarmAnimal(2 * given_water_consumption) {

}

void printConsumption(FarmAnimal &animal)
{
  cout << "This animal consumes " << animal.getWaterConsumption()
       << " liters of water" << endl;
}

int main()
{
  FarmAnimal animalA(5);
  DummyAnimal animalB;
  DoublingAnimal animalC(21);

  cout << "animalA consumes " << animalA.getWaterConsumption()
       << " liters of water." << endl;
  cout << "What about the others?" << endl;

  printConsumption(animalB);
  printConsumption(animalC);

  return 0;
}