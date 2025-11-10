#include <iostream>
#include <algorithm>
#include <iterator>
#include <functional>
#include <vector>
#include <numeric>

using namespace std;

template <class T>
void print(T start, T end) {
    for (; start != end; ++start) {
        std::cout << *start << " ";
    }
}

void print_student_data(const vector<double>& studentGrades, const vector<double>& weighted) {
    print(studentGrades.begin(), studentGrades.end());
    cout << endl;
    print(weighted.begin(), weighted.end());
    cout << endl;
    double sum = std::accumulate(weighted.begin(), weighted.end(), 0.0);
    cout << "Sum of weighted: " << sum << endl;
    cout << "Average: " << sum / weighted.size() << endl;
}

int main() {
    vector<double> student1Grades = { 3, 4, 5, 4, 4.5, 5, 3.5, 4 };
    vector<double> student2Grades = { 5, 4.5, 5, 4.5, 3, 3, 3.5, 5 };
    vector<double> gradesWeights = { 0.05, 0.15, 0.1, 0.2, 0.05, 0.3, 0.1, 0.05 };
    vector<double> weighted1(8);
    vector<double> weighted2(8);

    transform(student1Grades.begin(), student1Grades.end(), gradesWeights.begin(), weighted1.begin(), multiplies<double>());
    transform(student2Grades.begin(), student2Grades.end(), gradesWeights.begin(), weighted2.begin(), multiplies<double>());

    cout << "Student 1:" << endl;
    print_student_data(student1Grades, weighted1);
    cout << endl;

    cout << "Student 2:" << endl;
    print_student_data(student2Grades, weighted2);
    cout << endl;

    return 0;
}
