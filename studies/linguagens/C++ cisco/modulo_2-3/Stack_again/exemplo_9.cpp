#include <iostream>
#include <exception>
#include <stdexcept>

class stack_size_error : public std::length_error {
public:
    explicit stack_size_error(const std::string &msg);
};
class stack_bad_alloc : public std::bad_alloc {
public:
    explicit stack_bad_alloc(void);
};
class stack_overflow : public std::logic_error {
public:
    explicit stack_overflow(const std::string &msg);
};
class stack_empty : public std::logic_error {
public:
    explicit stack_empty(const std::string &msg);
};