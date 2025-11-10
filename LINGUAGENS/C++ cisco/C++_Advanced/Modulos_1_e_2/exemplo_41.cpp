explicit map (const Compare & comp = Compare (),
          const Allocator & = Allocator ());
template < class InputIterator > map
  (InputIterator first, InputIterator last,
   const Compare & comp = Compare (), const Allocator & = Allocator ());
map (const map < Key, T, Compare, Allocator > &x);