#include <iostream>
#include <vector>
#include <stdexcept>

class Matrix {
private:
    std::vector<std::vector<int>> data;
    int rows;
    int cols;

public:
    Matrix(int rows, int cols) : rows(rows), cols(cols) {
        data.resize(rows, std::vector<int>(cols, 0));
    }

    void setValue(int row, int col, int value) {
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            throw std::out_of_range("Index out of bounds");
        }
        data[row][col] = value;
    }

    void addValue(int value) {
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] += value;
            }
        }
    }

    void addMatrix(const Matrix& other) {
        if (rows != other.rows || cols != other.cols) {
            throw std::invalid_argument("Matrix sizes do not match for addition");
        }

        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] += other.data[i][j];
            }
        }
    }

    void subtractValue(int value) {
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] -= value;
            }
        }
    }

    void subtractMatrix(const Matrix& other) {
        if (rows != other.rows || cols != other.cols) {
            throw std::invalid_argument("Matrix sizes do not match for subtraction");
        }

        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] -= other.data[i][j];
            }
        }
    }

    void multiplyValue(int value) {
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] *= value;
            }
        }
    }

    void multiplyMatrix(const Matrix& other) {
        if (cols != other.rows) {
            throw std::invalid_argument("Invalid matrix dimensions for multiplication");
        }

        std::vector<std::vector<int>> result(rows, std::vector<int>(other.cols, 0));
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < other.cols; ++j) {
                for (int k = 0; k < cols; ++k) {
                    result[i][j] += data[i][k] * other.data[k][j];
                }
            }
        }
        data = result;
        cols = other.cols;
    }

    void display() const {
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                std::cout << data[i][j] << " ";
            }
            std::cout << std::endl;
        }
    }
};

Matrix createMatrixFromInput(const std::string& name) {
    int rows, cols;
    std::cout << "Enter the number of rows for Matrix " << name << ": ";
    std::cin >> rows;
    std::cout << "Enter the number of columns for Matrix " << name << ": ";
    std::cin >> cols;

    Matrix mat(rows, cols);

    std::cout << "Enter the values for Matrix " << name << ":\n";
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            int value;
            std::cout << "Enter value at position [" << i << "][" << j << "]: ";
            std::cin >> value;
            mat.setValue(i, j, value);
        }
    }
    return mat;
}

int main() {
    std::string operation;
    std::cout << "Enter the operation you want to perform (add, subtract, multiply): ";
    std::cin >> operation;

    Matrix matA = createMatrixFromInput("A");
    Matrix matB = createMatrixFromInput("B");

    std::cout << "Matrix A:" << std::endl;
    matA.display();
    std::cout << std::endl;

    std::cout << "Matrix B:" << std::endl;
    matB.display();
    std::cout << std::endl;

    try {
        if (operation == "add") {
            matA.addMatrix(matB);
            std::cout << "After addition:" << std::endl;
            matA.display();
        } else if (operation == "subtract") {
            matA.subtractMatrix(matB);
            std::cout << "After subtraction:" << std::endl;
            matA.display();
        } else if (operation == "multiply") {
            matA.multiplyMatrix(matB);
            std::cout << "After multiplication:" << std::endl;
            matA.display();
        } else {
            std::cerr << "Invalid operation entered!" << std::endl;
        }
    } catch (const std::invalid_argument& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    return 0;
}
