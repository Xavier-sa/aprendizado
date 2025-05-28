
### **ENTIDADES PRINCIPAIS**  
1. **Administrador**  
   - Atributos: ID, Nome, Email, Senha  
   - Responsável por gerenciar docentes, alunos, turmas e estatísticas.  

2. **Docente (Professor)**  
   - Atributos: ID, Nome, Email, Senha, LinkedIn, GitHub  
   - Pode gerenciar turmas e alunos vinculados.  

3. **Aluno**  
   - Atributos: ID, Nome, Email, LinkedIn, GitHub, TurmaID  
   - Relacionado a uma turma e projetos.  

4. **Turma**  
   - Atributos: ID, Nome, Ano, PoloID (ex: Campo Grande, Dourados)  
   - Contém alunos, docentes e projetos.  

5. **Projeto**  
   - Atributos: ID, Nome, Descrição, Link, TurmaID  
   - Vinculado a uma turma específica.  

6. **Unidade/Polo**  
   - Atributos: ID, Nome (ex: Senac Campo Grande)  
   - Pré-cadastrado com cidades de MS (Corumbá, Ponta Porã, etc.).  

7. **Visitante**  
   - Atributos: (Sem cadastro)  
   - Apenas visualiza dados (turmas, projetos, perfis).  

---

### **RELACIONAMENTOS**  
- **Administrador** → **Docente/Aluno**:  
  - Cria, edita e exclui cadastros (1:N).  

- **Docente** → **Turma**:  
  - Um docente pode estar em múltiplas turmas (N:M).  

- **Turma** → **Aluno/Projeto**:  
  - Uma turma tem vários alunos e projetos (1:N).  

- **Turma** → **Unidade/Polo**:  
  - Cada turma pertence a um polo (1:1).  

---

### **ATRIBUTOS CHAVE**  
- **Segurança**: Senhas criptografadas para Admin/Docente.  
- **Links**: GitHub e LinkedIn em Aluno/Docente.  
- **Estatísticas**: Contadores dinâmicos (alunos, projetos, etc.).  

---

### **DIAGRAMA DER (VISÃO GERAL)**  
```mermaid
erDiagram
    ADMINISTRADOR ||--o{ DOCENTE : "Gerencia"
    ADMINISTRADOR ||--o{ ALUNO : "Gerencia"
    DOCENTE }|--|{ TURMA : "Ministra"
    TURMA ||--o{ ALUNO : "Contém"
    TURMA ||--o{ PROJETO : "Possui"
    TURMA }|--|| UNIDADE : "Pertence a"
    VISITANTE }|..| TURMA : "Visualiza"
```

---

### **OBSERVAÇÕES**  
- **Cardinalidades**:  
  - Turma exige pelo menos 1 Docente e 1 Aluno.  
  - Projetos são opcionais por turma.  
- **Regras de Negócio**:  
  - Visitante não tem cadastro (apenas visualização).  
  - Admin tem permissões totais; Docente gerencia apenas suas turmas/alunos.  

