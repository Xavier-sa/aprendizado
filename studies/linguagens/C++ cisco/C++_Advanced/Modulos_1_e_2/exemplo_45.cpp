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
  return 0;
}