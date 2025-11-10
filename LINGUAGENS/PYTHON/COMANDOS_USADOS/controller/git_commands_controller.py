from model.git_commands import GitCommandsModel
from view.git_commands_view import GitCommandsView

class GitCommandsController:
    def __init__(self):
        self.model = GitCommandsModel()
        self.view = GitCommandsView(self)

    def get_commands(self):
        return self.model.get_commands()

    def run(self):
        self.view.mainloop()
