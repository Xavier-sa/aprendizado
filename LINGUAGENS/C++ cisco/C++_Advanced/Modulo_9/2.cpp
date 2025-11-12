template < class T >        // class template
  template < class U >      // member function template
void Array < T >::convertTo (Array < U > &dest)
{
  if (dest.getSize () >= getSize ())
    {
      for (unsigned i = 0; i < _size; ++i)
    {
      dest[i] = (U) _array[i];
    }
    }
  else
    {
      unsigned i = 0;
      for (; i < dest.getSize (); ++i)
    {
      dest[i] = (U) _array[i];
    }
      for (; i < _size; ++i)
    {
      dest.add (_array[i]);
    }
    }
}