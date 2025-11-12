#include <iostream>
#include <stdexcept>
#include <exception>
#include <string>

using namespace std;
const unsigned TOWER_SIZE = 3;

class HanoiTowerRangeException :public runtime_error {
public:
    HanoiTowerRangeException() : runtime_error("Tower out of range") {}
};

class HanoiDiskSizeException :public runtime_error {
public:
    HanoiDiskSizeException() : runtime_error("Bad disk size.") {}
};

class HanoiNoDiskException :public runtime_error {
public:
    HanoiNoDiskException() : runtime_error("No disk at source rod.") {}
};

class HanoiTowers {
public:
    HanoiTowers() {
        towers[0][0] = 3;
        towers[0][1] = 2;
        towers[0][2] = 1;
        for (unsigned i = 1; i < TOWER_SIZE; i++)
            for (unsigned j = 0; j < TOWER_SIZE; j++)
                towers[i][j] = 0;
    }

    void move(string command) {
        if (command.length() != 2)
            throw invalid_argument("Incorrect command format");
        char c1 = command[0];
        char c2 = command[1];
        if (c1 < '1' || c1 > '3' || c2 < '1' || c2 > '3')
            throw HanoiTowerRangeException();
        int source = c1 - '1';
        int dest = c2 - '1';
        int inHand = 0;
        int sourceIndex = 0;
        for (int i = TOWER_SIZE - 1; i >= 0; i--) {
            if (towers[source][i] > 0) {
                inHand = towers[source][i];
                towers[source][i] = 0;
                sourceIndex = i;
                break;
            }
        }
        if (!inHand)
            throw HanoiNoDiskException();
        for (int i = TOWER_SIZE - 2; i >= 0; i--) {
            if (towers[dest][i] > 0) {
                if (inHand > towers[dest][i]) {
                    towers[source][sourceIndex] = inHand;
                    throw HanoiDiskSizeException();
                }
                towers[dest][i + 1] = inHand;
                break;
            }
            if (!i)
                towers[dest][0] = inHand;
        }
    }

    void print() const {
        for (unsigned i = 0; i < TOWER_SIZE; i++) {
            cout << "tower_" << i + 1 << ":";
            bool isEmpty = true;
            for (unsigned j = 0; j < TOWER_SIZE; j++) {
                if (towers[i][j] > 0) {
                    isEmpty = false;
                    cout << " " << towers[i][j];
                }
            }
            if (isEmpty)
                cout << " empty";
            cout << endl;
        }
    }
private:
    int towers[TOWER_SIZE][TOWER_SIZE]; 
};

int main(void) {
    HanoiTowers hanoi;
    bool isMove = true;
    while (isMove) {
        string move;
        cin >> move;
        if (move == "0" || move == "q") {
            isMove = false;
            continue;
        }

        try {
            hanoi.move(move);
        }
        catch (exception& ex) {
            cout << "Exception - " << ex.what() << endl;
        }
    }

    hanoi.print();
    return 0;
}
