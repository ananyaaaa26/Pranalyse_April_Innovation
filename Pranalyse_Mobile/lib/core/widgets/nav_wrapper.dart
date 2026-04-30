import 'package:flutter/material.dart';
import 'custom_bottom_nav_bar.dart';
import '../../features/yoga/presentation/yoga_home_screen.dart';
import '../../features/diet/presentation/diet_recommendation_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/physio/presentation/physio_home_screen.dart';
import '../../features/profile/presentation/profile_screen.dart';

class NavWrapper extends StatefulWidget {
  const NavWrapper({super.key});

  @override
  State<NavWrapper> createState() => _NavWrapperState();
}

class _NavWrapperState extends State<NavWrapper> {
  int _selectedIndex = 2; // Start from Home

  final List<Widget> _pages = const [
    YogaHomeScreen(),
    DietRecommendationScreen(),
    HomeScreen(),
    PhysioHomeScreen(),
    ProfileScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}
