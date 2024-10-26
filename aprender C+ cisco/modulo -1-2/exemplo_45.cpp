#include <iostream>
#include <string>
#include <stdio.h>

class GymMembership {
public:
  GymMembership(int id, int months, std::string name);
  void printStatus();
  bool extend(int number_of_months);
  void cancel();
  int  get_id() { return id; }
private:
  int id;
  int valid_for_months;
  std::string name;
};

GymMembership::GymMembership(int id = 0, int months = 0, std::string name = "")
{
  // Save data to members according to limits
  this->id       = id;
  this->valid_for_months = (months > 0) ? months : 0;
  this->name = name;
}

bool GymMembership::extend(int number_of_months)
{
  // try to add months and return 'true' on success
  if (number_of_months <= 0)
  {
    return false;
  }
  valid_for_months += number_of_months;

  return true;
}

void GymMembership::cancel()
{
  valid_for_months = 0;
}

void GymMembership::printStatus()
{
  if (id != 0)
  {
    std::cout << "Member " << id << " : " << name
              << ", subscription valid for " << valid_for_months << " months" << std::endl;
  }
}

const int MAX_MEMBERS = 10;

int main() {
  // For the sake of cimplicty let's limit the maximum number of handled members to 10.
  GymMembership memberships[MAX_MEMBERS];

  std::string command = "";
  while (command != "quit")
  {
    int months  = 0;
    int id     = 0;
    bool command_known = false;
    bool command_ok    = false;
    bool any_member_valid = false;
    std::string error = "";
    for (int idx = 0; idx < MAX_MEMBERS; ++idx)
    {
      if (memberships[idx].get_id() != 0)
      {
        any_member_valid = true;
      }
      memberships[idx].printStatus();
    }
    if (!any_member_valid)
    {
      std::cout << "No members in the system" << std::endl;
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
    if (2 == sscanf(command.c_str(), "extend %d %d", &id, &months))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_MEMBERS && memberships[idx].get_id() != id) { idx++; }
        if (idx < MAX_MEMBERS)
        {
          command_ok = true;
          memberships[idx].extend(months);
        }
        else
        {
          error = std::string("member ") + std::to_string(id) + " not found";
        }

      }
    }
    else if (1 == sscanf(command.c_str(), "cancel %d", &id, &months))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_MEMBERS && memberships[idx].get_id() != id) { idx++; }
        if (idx < MAX_MEMBERS)
        {
          memberships[idx].cancel();
          command_ok = true;
        }
        else
        {
          error = std::string("member ") + std::to_string(id) + " not found";
        }
      }
    }
    else if (1 == sscanf(command.c_str(), "create %d", &id))
    {
      command_known = true;
      if (id != 0)
      {
        int idx = 0;
        while (idx < MAX_MEMBERS && memberships[idx].get_id() != id) { idx++; }
        if (idx < MAX_MEMBERS)
        {
          // id taken
          error = std::string("member ") + std::to_string(id) + " already exists";
        }
        else
        {
          idx = 0;
          while (idx < MAX_MEMBERS && memberships[idx].get_id() != 0) { idx++; }
          if (idx < MAX_MEMBERS && id != 0)
          {
            size_t second_space_pos = command.find(' ', command.find(' ') + 1);
            if (second_space_pos != std::string::npos)
            {
              memberships[idx] = GymMembership(id, 0, command.substr(second_space_pos+1));
              command_ok = true;
            }
            else
            {
              error = "name missing";
            }
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
        while (idx < MAX_MEMBERS && memberships[idx].get_id() != id) { idx++; }
        if (idx < MAX_MEMBERS)
        {
          memberships[idx] = GymMembership();
          command_ok = true;
        }
        else
        {
          error = std::string("member ") + std::to_string(id) + " not found";
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