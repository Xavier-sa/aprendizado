#include <iostream>
#include <string>
#include <stdio.h>

class FlightBooking {
public:
  FlightBooking(int id, int capacity, int reserved);
  void printStatus();
  bool reserveSeats(int number_of_seats);
  bool cancelReservations(int number_of_seats);
private:
  int id;
  int capacity;
  int reserved;
};

FlightBooking::FlightBooking(int id, int capacity, int reserved)
{
  // Save data to members according to limits
  this->id       = id;
  this->capacity = (capacity > 0) ? capacity : 0;
  this->reserved = (reserved > 0) ? reserved : 0;
  if ((100 * this->reserved) > ( 105 * this->capacity))
  {
    this->reserved = (105 * this->capacity) / 100;
  }
}

bool FlightBooking::reserveSeats(int number_of_seats)
{
  // try to add reservations and return 'true' on success
  if (number_of_seats <= 0 || (100 * (reserved + number_of_seats)) > ( 105 * capacity))
  {
    return false;
  }
  reserved += number_of_seats;

  return true;
}

bool FlightBooking::cancelReservations(int number_of_seats)
{
  // try to canel reservations and return 'true' on success
  if (number_of_seats <= 0  || reserved < number_of_seats)
  {
    return false;
  }
  reserved -= number_of_seats;

  return true;
}

void FlightBooking::printStatus()
{
  std::cout << "Flight " << id << " : " << reserved << '/'
       << capacity << " (" << (100 * reserved) / capacity << "%) seats reserved" << std::endl;
}

int main() {
  int reserved = 0,
      capacity = 0;
  std::cout << "Provide flight capacity: ";
  std::cin >> capacity;

  std::cout << "Provide number of reserved seats: ";
  std::cin >> reserved;

  FlightBooking booking(1, capacity, reserved);

  std::string command = "";
  while (command != "quit")
  {
    int seats  = 0;
    bool command_known = false;
    bool command_ok    = false;
    booking.printStatus();
    std::cout << "What would you like to do?: ";
    command = "";
    while (command == "")
    {
      std::getline(std::cin, command);
    }

    if (command == "quit")
    {
      command_known = true;
      command_ok    = true;
    }
    if (0 != sscanf(command.c_str(), "add %d", &seats))
    {
      command_known = true;
      command_ok = booking.reserveSeats(seats);
    }
    else if (0 != sscanf(command.c_str(), "cancel %d", &seats))
    {
      command_known = true;
      command_ok = booking.cancelReservations(seats);
    }

    if (command_known && !command_ok)
    {
      std::cout << "Cannot perform this operation" << std::endl;
    }
    if (!command_known)
    {
      std::cout << "Unknown command" << std::endl;
    }
  }

  return 0;
}