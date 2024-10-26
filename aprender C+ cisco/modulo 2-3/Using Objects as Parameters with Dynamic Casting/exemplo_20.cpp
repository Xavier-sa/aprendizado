#include <iostream>
#include <string>

using namespace std;
#define className(x) #x
#define NUMBER_OF_WHEELS 4
#define NUMBER_OF_LIGHTS 10

class Engine
{
public:
	Engine() {}
	Engine(const string& type) : type(type) {}
	Engine(const Engine& source) : type(source.type) {}
	void print() const
	{
		cout << className(Engine) << ": " << type << endl;
	}
private:
	string type;
};

class Wheel
{
public:
	Wheel(){}
	Wheel(const string& type) : type(type) {}
	Wheel(const Wheel& source) : type(source.type) {}
	void print() const
	{
		cout << className(Wheel) << ": " << type << endl;
	}
private:
	string type;
};

class Chassis
{
public:
	Chassis() {}
	Chassis(const string& type) : type(type) {}
	Chassis(const Chassis& source) : type(source.type) {}
	void print() const
	{
		cout << className(Chassis) << ": " << type << endl;
	}
private:
	string type;
};

class Light
{
public:
	Light(){}
	Light(const string& type) : type(type) {}
	Light(const Light& source): type(source.type) {}
	void print() const
	{
		cout << className(Light) << ": " << type << endl;
	}
private:
	string type;
};
class Body
{
public:
	Body() {}
	Body(const string& type) : type(type) {}
	Body(const Body& source) : type(source.type) {}
	void print() const
	{
		cout << className(Body) << ": " << type << endl;
	}
private:
	string type;
};

class Car
{
public:
	Car(const Engine& engine, const Chassis& chassis, const Body& body, 
		Wheel wheels[NUMBER_OF_WHEELS], Light lights[NUMBER_OF_LIGHTS])
		: engine(engine), chassis(chassis),	body(body)
	{
		for (int i = 0; i < NUMBER_OF_WHEELS; i++)
			this->wheels[i] = wheels[i];
		for (int i = 0; i < NUMBER_OF_LIGHTS; i++)
			this->lights[i] = lights[i];
	}

	void print() const
	{
		engine.print();
		for (int i = 0; i < NUMBER_OF_WHEELS; i++)
			wheels[i].print();
		chassis.print();
		for (int i = 0; i < NUMBER_OF_LIGHTS; i++)
			lights[i].print();
		body.print();
	}

private:
	Engine engine;
	Wheel wheels[NUMBER_OF_WHEELS];
	Chassis chassis;
	Light lights[NUMBER_OF_LIGHTS];
	Body body;
};


int main()
{
	Engine engine("1.0");;
	Chassis chassis("Normal");
	Body body("Black");
	Light lights[]={ Light("Type 1"), Light("Type 1"), 
		Light("Type 2"), Light("Type 2"), 
		Light("Type 3"), Light("Type 3"), 
		Light("Type 4"), Light("Type 4"), 
		Light("Type 5"), Light("Type 5")
	};
	Wheel wheels[] = { Wheel("16inches"), Wheel("16inches"), 
		Wheel("16inches"), Wheel("16inches") };
	
	Car car(engine, chassis, body, wheels, lights);
	car.print();

	cout << endl;
	return 0;
}