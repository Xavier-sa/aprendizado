#include <iostream>
#include <stdexcept>

class Array {
    int* _array;
    unsigned int _size;

public:
    Array(unsigned size = 0);
    ~Array();
    void add(int value);
    void delItem(unsigned index);
    unsigned int getSize() const;
    int& operator[](unsigned index);
};

Array::Array(unsigned size) : _array(nullptr), _size(size) {
    if (size > 0) {
        _array = new int[this->_size];
    }
}

void Array::add(int value) {
    int* tmp = new int[_size + 1];
    for (unsigned i = 0; i < _size; i++) {
        tmp[i] = _array[i];
    }
    delete[] _array;
    _array = tmp;
    _array[_size++] = value;
}

void Array::delItem(unsigned index) {
    if (_size == 0 || index >= _size) {
        return; // Ignore if index is out of bounds
    }

    int* tmp = new int[_size - 1];
    for (unsigned i = 0, j = 0; i < _size; i++) {
        if (i == index) {
            continue; // Skip the element at the given index
        }
        tmp[j++] = _array[i];
    }
    delete[] _array;
    _array = tmp;
    _size--;
}

unsigned int Array::getSize() const {
    return _size;
}

int& Array::operator[](unsigned index) {
    if (index >= _size) {
        throw std::out_of_range("Index out of bounds");
    }
    return _array[index];
}

Array::~Array() {
    delete[] _array;
}

int main() {
    Array arr(3);
    arr.add(15);
    arr.add(10);
    arr.add(5);

    std::cout << arr[0] << std::endl; // Output: 15
    arr.delItem(1);
    std::cout << arr[0] << std::endl; // Output: 15

    Array arr2(3);
    arr2.add(3);
    arr2.add(3);
    arr2.add(3);

    std::cout << "P" << arr2[0] << ": " << arr2.getSize() << ":" << arr2.getSize() << std::endl; // Output: P3: 3:3

    return 0;
}
