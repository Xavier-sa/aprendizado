explicit set (const Compare & comp = Compare (), const Allocator & =
          Allocator ());
template < class InputIterator > set (InputIterator first, InputIterator last,
                      const Compare & comp =
                      Compare (), const Allocator & =
                      Allocator ());
set (const set < Key, Compare, Allocator > &x);
explicit multiset (const Compare & comp = Compare (),
           const Allocator & = Allocator ());
template < class InputIterator >
multiset (InputIterator first, InputIterator last,
      const Compare & comp = Compare (), const Allocator & =
      Allocator ());
multiset (const multiset < Key, Compare, Allocator > &x);