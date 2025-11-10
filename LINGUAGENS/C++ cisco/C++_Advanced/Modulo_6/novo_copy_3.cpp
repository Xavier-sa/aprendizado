template < class InputIterator1, class InputIterator2, class OutputIterator >
  OutputIterator merge (InputIterator1 first1, InputIterator1 last1,
            InputIterator2 first2, InputIterator2 last2
            OutputIterator d_first)
{
  for (; first1 != last1; ++d_first)
    {
      if (first2 == last2)
    {
      return std::copy (first1, last1, d_first);
    }
      if (*first2 < *first1)
    {
      *d_first = *first2;
      ++first2;
    }
      else
    {
      *d_first = *first1;
      ++first1;
    }
    }
  return std::copy (first2, last2, d_first);
}

template < class InputIterator1, class InputIterator2,
  class OutputIterator, class Compare >
  OutputIterator merge (InputIterator1 first1, InputIterator1 last1,
            InputIterator2 first2, InputIterator2 last2
            OutputIterator d_first, Compare comp)
{
  for (; first1 != last1; ++d_first)
    {
      if (first2 == last2)
    {
      return std::copy (first1, last1, d_first);
    }
      if (comp (*first2, *first1))
    {
      *d_first = *first2;
      ++first2;
    }
      else
    {
      *d_first = *first1;
      ++first1;
    }
    }
  return std::copy (first2, last2, d_first);
}