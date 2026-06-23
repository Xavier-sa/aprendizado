template < class ForwardIterator >
  ForwardIterator adjacent_find (ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    {
      return last;
    }
  ForwardIterator next = first;
  ++next;
  for (next != last; ++next, ++first)
    {
      if (*first == *next)
    {
      return first;
    }
    }
  return last;
}

template < class ForwardIterator, BinaryPredicate p >
  ForwardIterator adjacent_find (ForwardIterator first, ForwardIterator last,
                 BinaryPredicate p)
{
  if (first == last)
    {
      return last;
    }
  ForwardIterator next = first;
  ++next;
  for (next != last; ++next, ++first)
    {
      if (p (*first, *next))
    {
      return first;
    }
    }
  return last;
}
