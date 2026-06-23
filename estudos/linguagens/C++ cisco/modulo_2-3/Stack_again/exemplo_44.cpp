#include <iostream>

using namespace std;

// Structure for tree element
struct treeElement {
    int value;
    treeElement* left;
    treeElement* right;
};

// Base class for Binary Tree
class BinaryTree {
public:
    BinaryTree() {
        p = nullptr;
    }

    // Method to insert value into the tree
    void insert(const int& rhs, treeElement* x) const {
        if (rhs < x->value) {
            if (x->left != nullptr)
                insert(rhs, x->left);
            else {
                x->left = new treeElement;
                x->left->value = rhs;
                x->left->left = nullptr;
                x->left->right = nullptr;
            }
        } else if (rhs >= x->value) {
            if (x->right != nullptr)
                insert(rhs, x->right);
            else {
                x->right = new treeElement;
                x->right->value = rhs;
                x->right->left = nullptr;
                x->right->right = nullptr;
            }
        }
    }

    // Method to insert value into the tree
    void insert(const int& rhs) {
        if (p == nullptr) {
            p = new treeElement;
            p->value = rhs;
            p->left = nullptr;
            p->right = nullptr;
        } else {
            insert(rhs, p);
        }
    }

protected:
    treeElement* p;
};

// Inorder derived class
class BinaryTreeInorder : public BinaryTree {
public:
    BinaryTreeInorder() : BinaryTree() {}

    // Method to print the tree in Inorder
    void printInorder(ostream& os, treeElement* x) const {
        if (x->left != nullptr)
            printInorder(os, x->left);
        os << x->value << " ";
        if (x->right != nullptr)
            printInorder(os, x->right);
    }

    // Overloading operator <<
    friend ostream& operator<<(ostream& os, const BinaryTreeInorder& rhs) {
        rhs.printInorder(os, rhs.p);
        return os;
    }
};

// Postorder derived class
class BinaryTreePostorder : public BinaryTree {
public:
    BinaryTreePostorder() : BinaryTree() {}

    // Method to print the tree in Postorder
    void printPostorder(ostream& os, treeElement* x) const {
        if (x->left != nullptr)
            printPostorder(os, x->left);
        if (x->right != nullptr)
            printPostorder(os, x->right);
        os << x->value << " ";
    }

    // Overloading operator <<
    friend ostream& operator<<(ostream& os, const BinaryTreePostorder& rhs) {
        rhs.printPostorder(os, rhs.p);
        return os;
    }
};

// Preorder derived class
class BinaryTreePreorder : public BinaryTree {
public:
    BinaryTreePreorder() : BinaryTree() {}

    // Method to print the tree in Preorder
    void printPreorder(ostream& os, treeElement* x) const {
        os << x->value << " ";
        if (x->left != nullptr)
            printPreorder(os, x->left);
        if (x->right != nullptr)
            printPreorder(os, x->right);
    }

    // Overloading operator <<
    friend ostream& operator<<(ostream& os, const BinaryTreePreorder& rhs) {
        rhs.printPreorder(os, rhs.p);
        return os;
    }
};

int main() {
    BinaryTreeInorder inorderTree;
    BinaryTreePostorder postorderTree;
    BinaryTreePreorder preorderTree;

    int value;
    while (cin >> value) {
        inorderTree.insert(value);
        postorderTree.insert(value);
        preorderTree.insert(value);
    }

    cout << "Inorder: ";
    cout << inorderTree << endl;

    cout << "Postorder: ";
    cout << postorderTree << endl;

    cout << "Preorder: ";
    cout << preorderTree << endl;

    return 0;
}
