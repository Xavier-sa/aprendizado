template < class ForwardIterator1, class ForwardIterator2 >
  ForwardIterator1 search (ForwardIterator1 first, ForwardIterator1 last,
               ForwardIterator2 s_first, ForwardIterator2 s_last)
{
  for (;; ++first)
    {
      ForwardIterator1 it = first;
      for (ForwardIterator2 s_it = s_first;; ++it, ++s_it)
    {
      if (s_it == s_last)
        {
          return first;
        }
      if (it == last)
        {
          return last;
        }
      if (!(*it == *s_it))
        {
          break;
        }
    }
    }
}

template < class ForwardIterator1, class ForwardIterator2,
  class BinaryPredicate > ForwardIterator1 search (ForwardIterator1 first,
                           ForwardIterator1 last,
                           ForwardIterator2 s_first,
                           ForwardIterator2 s_last,
                           BinaryPredicate p)
{
  for (;; ++first)
    {
      ForwardIterator1 it = first;
      for (ForwardIterator2 s_it = s_first;; ++it, ++s_it)
    {
      if (s_it == s_last)
        {
          return first;
        }
      if (it == last)
        {
          return last;
        }
      if (!p (*it, *s_it))
        {
          break;
        }
    }
    }
}

template < class ForwardIterator1, class ForwardIterator2 >
  ForwardIterator1 find_end (ForwardIterator1 first, ForwardIterator1 last,
                 ForwardIterator2 s_first,
                 ForwardIterator2 s_last)
{
  if (s_first == s_last)
    return last;
  ForwardIterator1 result = last;
  while (1)
    {
      ForwardIterator1 new_result =
    std::search (first, last, s_first, s_last);
      if (new_result == last)
    {
      return result;
    }
      else
    {
      result = new_result;
      first = result;
      ++first;
    }
    }
  return result;
}

template < class ForwardIterator1, class ForwardIterator2,
  class BinaryPredicate > ForwardIterator1 find_end (ForwardIterator1 first,
                             ForwardIterator1 last,
                             ForwardIterator2 s_first,
                             ForwardIterator2 s_last,
                             BinaryPredicate p)
{
  if (s_first == s_last)
    return last;
  ForwardIterator1 result = last;
  while (1)
    {
      ForwardIterator1 new_result =
    std::search (first, last, s_first, s_last, p);
      if (new_result == last)
    {
      return result;
    }
      else
    {
      result = new_result;
      first = result;
      ++first;
    }
    }
  return result;
}