int
main ()
{
  vector < A * >v1;
  v1.push_back (new A (1));
  cout << "First ready!\n";
  v1.push_back (new A (2));
  cout << "Second ready!\n";
  v1.push_back (new A (3));
  cout << "Third ready!\n";
  return 0;
}