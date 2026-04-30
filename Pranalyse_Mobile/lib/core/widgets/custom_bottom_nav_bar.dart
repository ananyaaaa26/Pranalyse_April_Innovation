import 'package:flutter/material.dart';

class CustomBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const CustomBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      backgroundColor: const Color(0xFF322F42),
      type: BottomNavigationBarType.fixed,
      currentIndex: currentIndex,
      onTap: onTap,
      showSelectedLabels: false,
      showUnselectedLabels: false,
      selectedFontSize: 0,
      unselectedFontSize: 0,
      items: List.generate(_icons.length, (index) {
        final isSelected = index == currentIndex;

        return BottomNavigationBarItem(
          icon: Container(
            padding: const EdgeInsets.all(8),
            decoration:
                isSelected
                    ? const BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white,
                    )
                    : null,
            child: Icon(
              _icons[index]['icon'],
              color: isSelected ? Colors.black : Colors.white,
            ),
          ),
          label: '',
        );
      }),
    );
  }
}

final List<Map<String, dynamic>> _icons = [
  {'icon': Icons.self_improvement}, // Yoga
  {'icon': Icons.restaurant_menu}, // Diet
  {'icon': Icons.home}, // Home
  {'icon': Icons.healing}, // Physio
  {'icon': Icons.person}, // Profile
];
