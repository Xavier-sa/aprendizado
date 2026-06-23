#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

class Pet
{
private:
	string name;
	string pet_type;
public:
	Pet(string name, string pet_type) :name(name), pet_type(pet_type) { ; }
	Pet() { ; }
	string get_name() const
	{
		return name;
	}
	string get_type() const
	{
		return pet_type;
	}
};

struct Equal
{
	bool operator()(const Pet & lhs, const Pet & rhs) const
	{
		return lhs.get_name() == rhs.get_name();
	}
};
int main() 
{
	vector<Pet> pets = { {"Amber", "Cat"}, {"Barky", "Dog"}, { "Barky", "Reptile" }, 
		{"Casper", "Fish"}, {"Casper", "Reptile"}, {"Godzilla", "Reptile" } };
	vector<Pet> uniquePets(pets.size());

	auto petsEnd = unique_copy(pets.begin(), pets.end(), uniquePets.begin(), Equal());
	for (auto pet : pets)
	{
		cout << pet.get_name() << " " << pet.get_type() << endl;
	}
	cout << endl;
	for (auto pet = uniquePets.begin() ; pet != petsEnd ; ++pet)
	{
		cout << pet->get_name() << " " << pet->get_type() << endl;
	}


	return 0;
}
