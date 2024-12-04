template < class InputIterator, class ForwardIterator >
  InputIterator find_first_of (InputIterator first, InputIterator last,
                   ForwardIterator s_first,
                   ForwardIterator s_last)
{
  for (; first != last; ++first)
    {
      for (ForwardIterator it = s_first; it != s_last; ++it)
    {
      if (*first == *it)
        {
          return first;
        }
    }
    }
  return last;
}

template < class InputIterator, class ForwardIterator, class BinaryPredicate >
  InputIterator find_first_of (InputIterator first, InputIterator last,
                   ForwardIterator s_first,
                   ForwardIterator s_last, BinaryPredicate p)
{
  for (; first != last; ++first)
    {
      for (ForwardIterator it = s_first; it != s_last; ++it)
    {
      if (p (*first, *it))
        {
          return first;
        }
    }
    }
  return last;
}
