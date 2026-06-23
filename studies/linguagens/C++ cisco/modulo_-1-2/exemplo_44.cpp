#include <iostream>
#include <string>
#include <stdio.h>

class FlightBooking {
public:
  FlightBooking(int id, int capacity, int reserved);
  void printStatus();
  bool reserveSeats(int number_of_seats);
  bool cancelReservations(int number_of_seats);
  int  get_id() { return id; }
private:
  int id;
  int capacity;
  int reserved;
};

FlightBooking::FlightBooking(int id = 0, int capacity = 0, int reserved = 0)
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
  if (id != 0)
  {
    std::cout << "Flight " << id << " : " << reserved << '/'
       << capacity << " (" << (100 * reserved) / capacity << "%) seats reserved" << std::endl;
  }
}

const int MAX_BOOKINGS = 10;

int main() {
  // For the sake of cimplicty let's limit the maximum number of handled flights to 10.
  FlightBooking bookings[MAX_BOOKINGS];

  std::string command = "";
  while (command != "quit")
  {
    int seats  = 0;
    int id     = 0;
    bool command_known = false;
    bool command_ok    = false;
    bool any_flight_valid = false;
    std::string error = "";
    for (int idx = 0; idx < MAX_BOOKINGS; ++idx)
    {
      if (bookings[idx].get_id() != 0)
      {
        any_flight_valid = true;
      }
      bookings[idx].printStatus();
    }
    if (!any_flight_valid)
    {
      std::cout << "No flights in the system" << std::endl;
    }

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
    if (2 == sscanf(command.c_str(), "add %d %d", &id, &seats))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_BOOKINGS && bookings[idx].get_id() != id) { idx++; }
        if (idx < MAX_BOOKINGS)
        {
          command_ok = bookings[idx].reserveSeats(seats);
          if (!command_ok)
          {
            error = "capacity reached";
          }
        }
        else
        {
          error = std::string("flight ") + std::to_string(id) + " not found";
        }

      }
    }
    else if (2 == sscanf(command.c_str(), "cancel %d %d", &id, &seats))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_BOOKINGS && bookings[idx].get_id() != id) { idx++; }
        if (idx < MAX_BOOKINGS)
        {
          command_ok = bookings[idx].cancelReservations(seats);
          if (!command_ok)
          {
            error = "not enough reservations";
          }
        }
        else
        {
          error = std::string("flight ") + std::to_string(id) + " not found";
        }
      }
    }
    else if (2 == sscanf(command.c_str(), "create %d %d", &id, &seats))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_BOOKINGS && bookings[idx].get_id() != id) { idx++; }
        if (idx < MAX_BOOKINGS)
        {
          // id taken
          error = std::string("flight ") + std::to_string(id) + " already exists";
        }
        else
        {
          idx = 0;
          while (idx < MAX_BOOKINGS && bookings[idx].get_id() != 0) { idx++; }
          if (idx < MAX_BOOKINGS && id != 0)
          {
            bookings[idx] = FlightBooking(id, seats);
            command_ok = true;
          }
        }
      }
    }
    else if (1 == sscanf(command.c_str(), "delete %d", &id))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_BOOKINGS && bookings[idx].get_id() != id) { idx++; }
        if (idx < MAX_BOOKINGS)
        {
          bookings[idx] = FlightBooking();
          command_ok = true;
        }
        else
        {
          error = std::string("flight ") + std::to_string(id) + " not found";
        }
      }
    }

    if (command_known && !command_ok)
    {
      std::cout << "Cannot perform this operation: " << error << std::endl;
    }
    if (!command_known)
    {
      std::cout << "Unknown command" << std::endl;
    }
  }

  return 0;
}