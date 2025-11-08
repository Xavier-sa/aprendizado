#include <exception>
#include <iostream>
#include <iomanip>
#include <string>
#include <sstream>

struct Point
{
    int x, y;
    Point() {}
    Point(int x, int y):x(x), y(y) {}
};

template <class T>
class Array
{
       T * _array;
       unsigned int _size;

public:
       Array(unsigned size = 0);
       virtual ~Array();

       void add(T value);

       void delItem(unsigned index);
      
       unsigned int getSize() const;
       T & operator[](unsigned index);

       std::string printArray() const;

       template <class U>
       void convertTo(Array<U> & dest);
};

template <class T>
Array<T>::Array(unsigned size) :  _array(0), _size(size)
{
       if (size > 0)
       {
               _array = new T[this->_size];
       }
}

template <class T>
Array<T>::~Array()
{
       delete[] _array;
}

template <class T>
void Array<T>::add(T value)
{
       if (_size == 0)
       {
               _array = new T[1];
       }
       else
       {
               T * tmp = new T[_size + 1];
               for (unsigned i = 0; i < _size; i++)
               {
                       tmp[i] = _array[i];
               }
               delete[] _array;
               _array = tmp;
       }
       _array[_size++] = value;
}

template <class T>
void Array<T>::delItem(unsigned index)
{
       if (_size == 1)
       {
               delete[] _array;
               _array = 0;
       }
       else
       {
               T * tmp = new T[_size - 1];
               for (unsigned i = 0, j = 0; i < _size; i++, j++)
               {
                       if (i == index)
                       {
                               j--;
                       }
                       tmp[j] = _array[i];
               }
               delete[] _array;
               _array = tmp;
       }
       _size--;
}

template <class T>
unsigned int Array<T>::getSize() const
{
       return _size;
}

template <class T>
T & Array<T>::operator [](unsigned index)
{
       if (index > _size -1)
       {
               std::exception e;
               throw e;
       }
       return _array[index];
}

template <class T>
std::string Array<T>::printArray() const
{
    std::ostringstream output;
    for(unsigned i = 0; i < _size; ++i)
    {
        output << std::setw(3) << _array[i];
    }
    return output.str();
}

template <>
std::string Array<Point>::printArray() const
{
    std::ostringstream output;
    for(unsigned i = 0; i < _size; ++i)
    {
        output << "(" << _array[i].x << "," << _array[i].y  << ") ";
    }
    return output.str();
}

template <class T>    // class template
template <class U>    // member function template
void Array<T>::convertTo(Array<U> & dest)
{
    if(dest.getSize() >= getSize())
    {
        for(unsigned i = 0; i < _size; ++i)
        {
            dest[i] = (U)_array[i];
        }
    }
    else
    {
        unsigned i = 0;
        for( ; i < dest.getSize(); ++i)
        {
            dest[i] = (U)_array[i];
        }
        for( ; i < _size; ++i)
        {
            dest.add(_array[i]);
        }
    }
}

int main()
{
    Array <int> aInt;
    Array <float> aFloat;

    aInt.add(1);
    aInt.add(2);
    aInt.add(3);
    aInt.convertTo(aFloat);
    std::cout<< "Int array: " << aInt.printArray() << std::endl;
    std::cout<< "Float array: " << aFloat.printArray() << std::endl;
    return 0;
}