template < class InputIterator1, class InputIterator2 >
  bool includes (InputIterator1 first1, InputIterator1 last1,
         InputIterator2 first2, InputIterator2 last2)
{
  for (; first2 != last2; ++first1)
    {
      if (first1 == last1 || *first2 < *first1)
    return false;
      if (!(*first1 < *first2))
    ++first2;
    }
  return true;
}

template < class InputIterator1, class InputIterator2 >
  bool includes (InputIterator1 first1, InputIterator1 last1,
         InputIterator2 first2, InputIterator2 last2, Compare comp)
{
  for (; first2 != last2; ++first1)
    {
      if (first1 == last1 || comp (*first2, *first1))
    return false;
      if (!comp (*first1, *first2))
    ++first2;
    }
  return true;
}