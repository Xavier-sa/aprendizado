template < class InputIterator1, class InputIterator2, class OutputIterator >
  OutputIterator merge (InputIterator1 first1, InputIterator1 last1,
            InputIterator2 first2, InputIterator2 last2,
            OutputIterator d_first);

template < class InputIterator1, class InputIterator2, class OutputIterator,
  class Compare > OutputIterator merge (InputIterator1 first1,
                    InputIterator1 last1,
                    InputIterator2 first2,
                    InputIterator2 last2,
                    OutputIterator d_first, Compare comp);