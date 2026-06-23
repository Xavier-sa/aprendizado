#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Board {
private:
    vector<vector<char>> grid;
public:
    Board() {
        grid = {{' ', ' ', ' '}, {' ', ' ', ' '}, {' ', ' ', ' '}};
    }

    void display() {
        cout << "  0 1 2\n";
        for (int i = 0; i < 3; ++i) {
            cout << i << " ";
            for (int j = 0; j < 3; ++j) {
                cout << grid[i][j] << ' ';
            }
            cout << endl;
        }
    }

    bool mark(int row, int col, char symbol) {
        if (grid[row][col] == ' ') {
            grid[row][col] = symbol;
            return true;
        }
        return false;
    }

    bool checkWin(char symbol) {
        // Check rows and columns
        for (int i = 0; i < 3; ++i) {
            if ((grid[i][0] == symbol && grid[i][1] == symbol && grid[i][2] == symbol) ||
                (grid[0][i] == symbol && grid[1][i] == symbol && grid[2][i] == symbol)) {
                return true;
            }
        }
        // Check diagonals
        if ((grid[0][0] == symbol && grid[1][1] == symbol && grid[2][2] == symbol) ||
            (grid[0][2] == symbol && grid[1][1] == symbol && grid[2][0] == symbol)) {
            return true;
        }
        return false;
    }

    bool isFull() {
        for (auto& row : grid) {
            for (char cell : row) {
                if (cell == ' ') return false;
            }
        }
        return true;
    }
};

class Player {
private:
    string name;
    char symbol;
public:
    Player(string playerName, char playerSymbol) : name(playerName), symbol(playerSymbol) {}

    string getName() {
        return name;
    }

    char getSymbol() {
        return symbol;
    }
};

class Game {
private:
    Board board;
    Player player1;
    Player player2;
    Player* currentPlayer;
public:
    Game(string name1, string name2) 
        : player1(name1, 'X'), player2(name2, 'O'), currentPlayer(&player1) {}

    void play() {
        int row, col;
        while (true) {
            board.display();
            cout << currentPlayer->getName() << "'s turn (" << currentPlayer->getSymbol() << "): ";
            cin >> row >> col;

            if (row < 0 || row > 2 || col < 0 || col > 2 || !board.mark(row, col, currentPlayer->getSymbol())) {
                cout << "Invalid move! Try again." << endl;
                continue;
            }

            if (board.checkWin(currentPlayer->getSymbol())) {
                board.display();
                cout << currentPlayer->getName() << " wins!" << endl;
                break;
            }

            if (board.isFull()) {
                board.display();
                cout << "It's a draw!" << endl;
                break;
            }

            // Switch player
            currentPlayer = (currentPlayer == &player1) ? &player2 : &player1;
        }
    }
};

int main() {
    string name1, name2;
    cout << "Enter name for Player 1 (X): ";
    getline(cin, name1);
    cout << "Enter name for Player 2 (O): ";
    getline(cin, name2);

    Game game(name1, name2);
    game.play();

    return 0;
}
