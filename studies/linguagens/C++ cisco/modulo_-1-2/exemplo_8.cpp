#include <iostream>
#include <iomanip> // for setprecision
using namespace std;

int main(void) {
    float grossprice, taxrate, netprice, taxvalue;
    
    cout << "Enter a gross price: ";
    cin >> grossprice;
    cout << "Enter a tax rate: ";
    cin >> taxrate;
    
    if(grossprice <= 0.0 || taxrate < 0.0 || taxrate > 100.0) {
        cout << "Input data doesn't look correct - I refuse calculations." << endl;
    } else {
        netprice = grossprice / (1.0 + taxrate / 100.0);
        taxvalue = grossprice - netprice;
        
        cout << fixed << setprecision(4); // Set precision to 4 decimal places
        cout << "Net price: " << netprice << endl;
        cout << "Tax value: " << taxvalue << endl;
    }
    
    return 0;
}
