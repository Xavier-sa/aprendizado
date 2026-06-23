template < class InputIterator, class T >
  InputIterator find (InputIterator first, InputIterator last,
              const T & value)
{
  for (; first != last; ++first)
    {
      if (*first == value)
    {
      return first;
    }
    }
  return last;
}

template < class InputIterator, class UnaryPredicate >
  InputIterator find_if (InputIterator first, InputIterator last,
             UnaryPredicate p)
{
  for (; first != last; ++first)
    {
      if (p (*first))
    {
      return first;
    }
    }
  return last;
}