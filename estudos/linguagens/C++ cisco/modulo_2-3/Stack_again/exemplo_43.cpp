#include <iostream>

using namespace std;
enum FSMStates
{
	StateStart=1,
	State1,
	State2,
	State3,
	State4,
	StateStop
};
class FiniteStateMachine
{
public:
	FiniteStateMachine()
	{
		currentState = StateStart;
		statesCount = 0;
		history[statesCount] = currentState;
	}
	void print(ostream &os) const
	{
		for (unsigned i = 0; i <= statesCount; i++)
		{
			os << history[i];
			if (history[i] == StateStart)
				os << "(Start)";
			if (history[i] == StateStop)
				os << "(Stop)";
			if (i < statesCount)
				os << ", ";
		}
		os << endl;
	};

	void operator<<(const int& rhs)
	{
		if (currentState == StateStart)
		{
			if (rhs > 5)
				currentState = State1;
			else
				currentState = State2;
		}
		else if (currentState == State1 || currentState == State2)
		{
			if (rhs > 5)
				currentState = State3;
			else
				currentState = State4;
		}
		else if (currentState == State3 || currentState == State4)
		{
			currentState = StateStop;
		}
		statesCount ++;
		history[statesCount] = currentState;
	}
protected:
	int currentState;
	unsigned statesCount;
	int history[100];//simplification
};

ostream& operator<<(ostream& os, const FiniteStateMachine& rhs)
{
	rhs.print(os);
	return os;
}

int main(void) {
	FiniteStateMachine fsm;
	fsm << 3;
	fsm << 6;
	fsm << 4;
	cout << fsm;
	return 0;
}