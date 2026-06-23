#include <iostream>
#include <deque>
#include <stdexcept> // Include <stdexcept> for std::runtime_error

using namespace std;

enum CommandType
{
    MoveLeft,
    MoveRight,
    MoveForward,
    MoveBackward
};

class RoboCommander
{
private:
    deque<CommandType> commands;

public:
    void AddCommand(CommandType command)
    {
        commands.push_back(command);
    }

    void UndoCommand()
    {
        if (!commands.empty())
            commands.pop_back();
    }

    void Execute()
    {
        for (auto it = commands.begin(); it != commands.end(); ++it)
        {
            switch (*it)
            {
            case MoveLeft:
                cout << "Moving left" << endl;
                break;
            case MoveRight:
                cout << "Moving right" << endl;
                break;
            case MoveForward:
                cout << "Moving forward" << endl;
                break;
            case MoveBackward:
                cout << "Moving backward" << endl;
                break;
            default:
                throw runtime_error("Not supported."); // Use runtime_error instead of exception
                break;
            }
        }
        cout << "Ready" << endl;
    }
};

int main()
{
    RoboCommander commander;
    commander.AddCommand(MoveLeft);
    commander.AddCommand(MoveRight);
    commander.UndoCommand();
    commander.UndoCommand();
    commander.UndoCommand();
    commander.AddCommand(MoveLeft);
    commander.AddCommand(MoveForward);
    commander.AddCommand(MoveLeft);
    commander.AddCommand(MoveForward);
    commander.AddCommand(MoveRight);
    commander.AddCommand(MoveBackward);
    commander.Execute();
    commander.UndoCommand();
    commander.UndoCommand();
    commander.UndoCommand();
    commander.UndoCommand();
    commander.AddCommand(MoveForward);
    commander.Execute();
    return 0;
}
