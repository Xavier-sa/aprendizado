# Definição para o nó da lista encadeada
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        # Inicializa um nó cabeça para a lista resultante
        dummy_head = ListNode()
        current = dummy_head  # Ponteiro para construir a nova lista
        carry = 0  # Carregar a soma acima de 10
        
        # Percorre ambos os números até o final
        while l1 or l2 or carry:
            # Se l1 ainda tiver valores, extrai o valor
            val1 = l1.val if l1 else 0
            # Se l2 ainda tiver valores, extrai o valor
            val2 = l2.val if l2 else 0
            
            # Soma dos valores e o carry
            total = val1 + val2 + carry
            carry = total // 10  # O carry para a próxima iteração
            current.next = ListNode(total % 10)  # Cria o próximo nó na lista resultante
            
            current = current.next  # Avança o ponteiro na nova lista
            
            # Avança nas listas l1 e l2, se houver mais elementos
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        
        # O retorno será a lista resultante, ignorando o nó cabeça
        return dummy_head.next  # Este é o primeiro nó da lista resultante

# Função auxiliar para converter lista para ListNode
def to_listnode(lst):
    dummy = ListNode()
    current = dummy
    for value in lst:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

# Função auxiliar para converter ListNode para lista
def to_list(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result

# Exemplos de uso
l1 = to_listnode([2, 4, 3])
l2 = to_listnode([5, 6, 4])
solution = Solution()
result = solution.addTwoNumbers(l1, l2)
print(to_list(result))  # Saída esperada: [7, 0, 8]

l1 = to_listnode([0])
l2 = to_listnode([0])
result = solution.addTwoNumbers(l1, l2)
print(to_list(result))  # Saída esperada: [0]

l1 = to_listnode([9, 9, 9, 9, 9, 9, 9])
l2 = to_listnode([9, 9, 9, 9])
result = solution.addTwoNumbers(l1, l2)
print(to_list(result))  # Saída esperada: [8, 9, 9, 9, 0, 0, 0, 1]
