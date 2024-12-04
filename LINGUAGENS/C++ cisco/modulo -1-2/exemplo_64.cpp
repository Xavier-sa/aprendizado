#include <iostream>

using namespace std;

class Node
{
public:
  Node(int val);
  int value;
  Node* prev;
  Node* next;
};

Node::Node(int val) : value(val), next(nullptr), prev(nullptr) {}


class List
{
public:
  List();
  List(List &other);
  ~List();
  void push_front(int value);
  bool pop_front(int &value);
  void push_back(int value);
  bool pop_back(int &value);
  int  at(int index);
  void insert_at(int index, int value);
  void remove_at(int index);
  int size(){ return list_size; }
private:
  // other members you may have used
  Node* head;
  Node* tail;
  size_t list_size;
};

List::List() : head(nullptr), tail(nullptr), list_size(0)
{
}

List::~List()
{
  while (head != nullptr) {
    Node* n = head;
    head = head->next;
    delete n;
  }
}

List::List(List &other): List()
{
  Node* n = other.head;
  while (n != nullptr) {
    push_back(n->value);
    n = n->next;
  }
}

void List::push_front(int value)
{
  Node* new_head = new Node(value);
  new_head->next = head;
  new_head->prev = nullptr;
  if (head != nullptr)
  {
    head->prev = new_head;
  }
  head=new_head;
  if (tail == nullptr)
  {
    tail = head;
  }
  ++list_size;
}

void List::push_back(int value)
{
  Node* new_tail = new Node(value);
  new_tail->next = nullptr;
  new_tail->prev = tail;
  if (tail != nullptr)
  {
    tail->next = new_tail;
  }
  tail = new_tail;
  if (head == nullptr)
  {
    head = tail;
  }
  ++list_size;
}

bool List::pop_front(int &value)
{
  if (head != nullptr)
  {
    Node* popped = head;
    head = head->next;
    if (head == nullptr)
    {
      tail = nullptr;
    }
    else
    {
      head->prev = nullptr;
    }
    value = popped->value;
    delete popped;
    --list_size;
    return true;
  }
  return false;
}

bool List::pop_back(int &value)
{
  if (tail != nullptr)
  {
    Node* popped = tail;
    tail = tail->prev;
    if (tail == nullptr)
    {
      head = nullptr;
    }
    else
    {
      tail->next = nullptr;
    }
    value = popped->value;
    delete popped;
    --list_size;
    return true;
  }
  return false;
}

int List::at(int index)
{
  int i = 0;
  Node* n = head;
  while (i < index)
  {
    n = n->next;
    ++i;
  }
  return n->value;
}

void List::insert_at(int index, int value)
{
  if (index == 0)
  {
    push_front(value);
  }
  else if (index == list_size)
  {
    push_back(value);
  }
  else
  {
    Node* n = new Node(value);
    int i = 1;
    Node* before = head;
    while (i < index)
    {
      before = before->next;
      ++i;
    }
    Node* after = before->next;
    // don't need to check for nullptr
    // case handled by index == list_size
    n->next = after;
    n->prev = before;
    before->next = n;
    after->prev = n;
    ++list_size;
  }
}

void List::remove_at(int index){
  if (index == 0)
  {
    int temp;
    pop_front(temp);
  }
  else if (index == list_size)
  {
    int temp;
    pop_back(temp);
  }
  else
  {
    int i = 1;
    Node* before = head;
    while (i < index)
    {
      before = before->next;
      ++i;
    }
    Node* removed = before->next;
    Node* after   = removed->next;
    before->next = after;
    after->prev = before;
    delete removed;
    --list_size;
  }
}

void printList(List &list)
{
  for (int i = 0; i < list.size(); i++)
  {
    cout << "list[" << i << "] == " << list.at(i) << endl;
  }
}

int main()
{
  List list1;
  list1.push_front(1);
  list1.push_front(2);
  list1.push_front(3);
  list1.push_front(4);
  cout << "list1" << endl;
  printList(list1);
  cout << endl;

  List list2(list1);
  cout << "list2" << endl;
  printList(list2);
  cout << endl;

  list1.insert_at(1, 6);
  list2.remove_at(2);

  cout << "list1" << endl;
  printList(list1);
  cout << "list2" << endl;
  printList(list2);
  cout << endl;

  return 0;
}