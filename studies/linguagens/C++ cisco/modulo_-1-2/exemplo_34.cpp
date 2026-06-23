class Stack {
private:
      int stackstore[100];
      int SP;
public:
      void push(int value);
      int pop(void) { 
             return stackstore[--SP];
      }
};