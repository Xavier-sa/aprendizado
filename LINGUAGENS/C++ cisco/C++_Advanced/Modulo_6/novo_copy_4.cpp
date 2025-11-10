template < class BidirectionalIterator >
  void inplace_merge (BidirectionalIterator first,
              BidirectionalIterator middle,
              BidirectionalIterator last);

template < class BidirectionalIterator, class Compare >
  void inplace_merge (BidirectionalIterator first,
              BidirectionalIterator middle,
              BidirectionalIterator last, Compare comp);