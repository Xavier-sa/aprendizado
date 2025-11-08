#include <iostream>

using namespace std;

class Node
{
public:
  Node(int val);
  int value;
  Node* next;
};

Node::Node(int val) : value(val), next(nullptr) {}


class List
{
public:
  List();
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

void printList(List &list)
{
  for (int i = 0; i < list.size(); i++)
  {
    cout << "list[" << i << "] == " << list.at(i) << endl;
  }
}

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

void List::push_front(int value)
{
  Node* new_head = new Node(value);
  new_head->next = head;
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
  if (head == nullptr)
  {
    head = new_tail;
    tail = new_tail;
  }
  else
  {
    tail->next = new_tail;
    tail = new_tail;
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
    value = popped->value;
    delete popped;
    --list_size;
    return true;
  }
  return false;
}

bool List::pop_back(int &value)
{
  if (head != nullptr)
  {
    Node* node = head;
    if (node == tail)
    {
      value = node->value;
      head = nullptr;
      tail = nullptr;
    }
    else
    {
      while (node->next != tail)
      {
        node = node->next;
      }
      value = tail->value;
      delete tail;
      tail = node;
    }
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
    n->next = before->next;
    before->next = n;
    if (n->next == nullptr)
    {
      tail = n;
    }
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
    before->next = removed->next;
    delete removed;
    --list_size;
  }
}

int main()
{
  List list;
  //
  list.push_back(1);
  list.push_back(2);
  list.push_back(3);
  list.push_back(4);
  printList(list);
  cout << endl;

  list.remove_at(2);
  printList(list);
  cout << endl;

  list.insert_at(1, 6);
  printList(list);

  return 0;
}