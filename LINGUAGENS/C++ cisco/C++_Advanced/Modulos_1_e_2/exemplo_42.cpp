explicit multimap (const Compare & comp = Compare (),
           const Allocator & = Allocator ());
template < class InputIterator > multimap
  (InputIterator first, InputIterator last,
   const Compare & comp = Compare (), const Allocator & = Allocator ());
multimap (const multimap < Key, T, Compare, Allocator > &x);