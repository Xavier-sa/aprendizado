class A {  
public:
   explicit A(int) {}
};

class B {  
public:
   B(int) {}
};
int main(void) {
	A a = 1;  // compilation error!
	B b = 1;
	return 0;
}