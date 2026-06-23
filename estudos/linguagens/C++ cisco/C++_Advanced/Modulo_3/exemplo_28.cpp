template < class InputIterator, class T >
  typename iterator_traits < InputIterator >::difference_type
count (InputIterator first, InputIterator last, const T & value)
{
  typename iterator_traits < InputIterator >::difference_type ret = 0;
  for (; first != last; ++first)
    {
      if (*first == value)
    {
      ret++;
    }
    }
  return ret;
}

template < class InputIterator, class UnaryPredicate >
  typename iterator_traits < InputIterator >::difference_type
count_if (InputIterator first, InputIterator last, UnaryPredicate p)
{
  typename iterator_traits < InputIterator >::difference_type ret = 0;
  for (; first != last; ++first)
    {
      if (p (*first))
    {
      ret++;
    }
    }
  return ret;
}