int
main ()
{
  Array A (10);
  for (unsigned i = 0; i < A.getSize (); ++i)
    {
      A[i] = i;
    }
  for (unsigned i = 0; i < A.getSize (); ++i)
    {
      std::cout << A[i] << " ";
    }
  std::cout << "\n";

  std::cout << A.getSize () << std::endl;
  A.add (100);
  std::cout << A.getSize () << std::endl;
  A.delItem (A.getSize () - 1);
  std::cout << A.getSize () << std::endl;
  return 0;
}