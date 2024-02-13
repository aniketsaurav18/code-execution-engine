#include <iostream>

int main() {
    int n;

    std::cout << "Enter the number of elements (n): ";
    std::cin >> n;

    if (n < 0) {
        std::cerr << "Error: Please enter a non-negative number for 'n'. Exiting program.\n";
        return 1;
    }

    std::cout << "Enter " << n << " numbers:\n";

    for (int i = 0; i < n; ++i) {
        double num;
        std::cin >> num;
        std::cout << "Square of " << num << " is: " << num * num << "\n";
    }

    return 0;
}