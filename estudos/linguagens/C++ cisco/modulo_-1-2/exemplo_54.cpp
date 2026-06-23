#include <iostream>
#include <string>
#include <sstream>

using namespace std;

class FarmAnimal {
public:
    virtual double getWaterConsumption() = 0;
};

class Cow : public FarmAnimal {
private:
    double weight;
public:
    Cow(double weight) : weight(weight) {}
    virtual double getWaterConsumption() override {
        return weight / 100 * 8.6;
    }
};

class Sheep : public FarmAnimal {
private:
    double weight;
public:
    Sheep(double weight) : weight(weight) {}
    virtual double getWaterConsumption() override {
        return weight / 10 * 1.1;
    }
};

class Horse : public FarmAnimal {
private:
    double weight;
public:
    Horse(double weight) : weight(weight) {}
    virtual double getWaterConsumption() override {
        return weight / 100 * 6.8;
    }
};

int main() {
    string input;
    double totalWaterConsumption = 0.0;

    while (getline(cin, input) && !input.empty()) {
        string animal;
        double weight;
        istringstream iss(input);
        iss >> animal >> weight;

        if (animal == "cow") {
            Cow cow(weight);
            totalWaterConsumption += cow.getWaterConsumption();
        } else if (animal == "sheep") {
            Sheep sheep(weight);
            totalWaterConsumption += sheep.getWaterConsumption();
        } else if (animal == "horse") {
            Horse horse(weight);
            totalWaterConsumption += horse.getWaterConsumption();
        }
    }

    cout << totalWaterConsumption << endl;

    return 0;
}
