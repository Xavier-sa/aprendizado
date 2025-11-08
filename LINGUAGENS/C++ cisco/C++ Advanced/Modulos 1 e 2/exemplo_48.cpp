int
main ()
{
  vector < A > v1;		//(1)
  v1.push_back (1);		//(1)
  cout << "First ready!\n";
  //copy constructor
  vector < A > v2 (v1);		//(2)
  cout << "Second ready!\n";
  //assignment operator - empty target
  vector < A > v3;		//(3)
  v3 = v2;			//(3)
  cout << "Third ready!\n";
  //assignment - not empty target
  vector < A > v4 (2);		//(4)
  v4 = v2;			//(4)
  return 0;
}