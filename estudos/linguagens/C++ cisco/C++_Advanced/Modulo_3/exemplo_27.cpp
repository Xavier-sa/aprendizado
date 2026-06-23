template < class InputIterator, class T >
  typename iterator_traits < InputIterator >::difference_type
count (InputIterator first, InputIterator last, const T & value);

template < class InputIterator, class UnaryPredicate >
  typename iterator_traits < InputIterator >::difference_type
count_if (InputIterator first, InputIterator last, UnaryPredicate p);