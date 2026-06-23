template < class ForwardIterator, class Size, class T >
  ForwardIterator1 search_n (ForwardIterator first, ForwardIterator last,
                 Size count, const T & value)
{
  Size curr_count = 0;
  ForwardIterator result, t_last = first;
  std::advance (t_last, std::distance (first, last) - count + 1);

  for (; first != t_last; first++)
    {
      curr_count = 0;
      result = first;
      while (*first == value)
    {
      curr_count++;
      if (curr_count == count)
        {
          return result;
        }
      ++first;
    }
    }
  return last;
}

template < class ForwardIterator, class Size, class T, class BinaryPredicate >
  ForwardIterator1 search_n (ForwardIterator first, ForwardIterator last,
                 Size count, const T & value, BinaryPredicate p)
{
  Size curr_count = 0;
  ForwardIterator result, t_last = first;
  std::advance (t_last, std::distance (first, last) - count + 1);

  for (; first != t_last; first++)
    {
      curr_count = 0;
      result = first;
      while (p (*first == value))
    {
      curr_count++;
      if (curr_count == count)
        {
          return result;
        }
      ++first;
    }
    }
  return last;
}