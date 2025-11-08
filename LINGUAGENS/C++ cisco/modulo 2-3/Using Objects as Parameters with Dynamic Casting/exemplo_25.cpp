class Class {
public:
	int field;
	Class(int n) : field(n) { };
	Class(Class &c) : field(0) { };
	Class(void) : field(1) { };
	void set(int n) { field = n; }
	int get(void) const { return field; }
};