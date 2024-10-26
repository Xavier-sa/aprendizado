#include <iostream>
#include <string>
#include <sstream>
#include <cmath>

using namespace std;

class Point2D {
public:
    Point2D(double x, double y) :
        x(x), y(y) {}
    double get_x() const { return x; }
    double get_y() const { return y; }
private:
    double x;
    double y;
};

class Line2D {
public:
    Line2D(double slope, double y_intercept) :
        slope(slope), y_intercept(y_intercept) {}
    Line2D(Point2D pointA, Point2D pointB);
    string toString() const;
private:
    double slope;
    double y_intercept;
};

string Line2D::toString() const {
    std::ostringstream os;
    os << "y = ";
    if (slope == 0) {
        os << y_intercept;
    } else {
        if (slope == 1) {
            os << "x ";
        } else if (slope == -1) {
            os << "-x ";
        } else {
            os << slope << "x ";
        }
        if (y_intercept != 0) {
            os << (y_intercept > 0 ? "+ " : "- ") << fabs(y_intercept);
        }
    }
    return os.str();
}

Line2D::Line2D(Point2D pointA, Point2D pointB) {
    slope = (pointB.get_y() - pointA.get_y()) / (pointB.get_x() - pointA.get_x());
    y_intercept = pointA.get_y() - slope * pointA.get_x();
}

Point2D read_point() {
    double x = 0.0, y = 0.0;
    std::string input = "";
    std::getline(cin, input);

    bool format_ok = (2 == sscanf(input.c_str(), "%lf %lf", &x, &y));
    if (!format_ok) {
        format_ok = (2 == sscanf(input.c_str(), "%lf, %lf", &x, &y));
    }

    if (!format_ok) {
        cout << "Unrecognized input format" << endl;
    }

    return Point2D(x, y);
}

int main() {
    Point2D p1 = read_point();
    Point2D p2 = read_point();

    cout << Line2D(p1, p2).toString() << endl;

    return 0;
}
