template < class ForwardIterator1, class ForwardIterator2,
  class BinaryPredicate > ForwardIterator1 search (ForwardIterator1 first,
                           ForwardIterator1 last,
                           ForwardIterator2 s_first,
                           ForwardIterator2 s_last,
                           BinaryPredicate p);
template < class ForwardIterator1,
  class ForwardIterator2 > ForwardIterator1 find_end (ForwardIterator1 first,
                              ForwardIterator1 last,
                              ForwardIterator2
                              s_first,
                              ForwardIterator2
                              s_last);