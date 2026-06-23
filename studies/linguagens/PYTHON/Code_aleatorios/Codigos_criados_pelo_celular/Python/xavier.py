from aluno import Aluno
from disciplina import Disciplina
from professor import Professor


aluno1 = Aluno("Luiz", 8,"B", 10,9,6,5)
# print(aluno1)

professor1 = Professor("Eder", "Matemática")
# print(professor1)

disciplina1 = Disciplina(aluno1, professor1)

disciplina1.exibir_media()