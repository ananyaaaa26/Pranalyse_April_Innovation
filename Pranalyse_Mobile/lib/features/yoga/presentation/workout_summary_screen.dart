import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class WorkoutSummaryScreen extends StatefulWidget {
  const WorkoutSummaryScreen({super.key});

  @override
  State<WorkoutSummaryScreen> createState() => _WorkoutSummaryScreenState();
}

class _WorkoutSummaryScreenState extends State<WorkoutSummaryScreen> {
  double progress = 0.6;

  @override
  Widget build(BuildContext context) {
    final themeColor = const Color(0xFF3F2A68);
    final cardColor = const Color(0xFF4B3B7A);

    return Scaffold(
      backgroundColor: themeColor,
      bottomNavigationBar: _buildBottomNav(),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _buildHeader(),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  "Click on any to know in detail",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  _buildOptionCard("Workout Duration", cardColor),
                  const SizedBox(height: 16),
                  _buildOptionCard("Number of Poses Completed", cardColor),
                  const SizedBox(height: 16),
                  _buildOptionCard("Calories Burned", cardColor),
                  const SizedBox(height: 16),
                  _buildOptionCard("Pose Accuracy Score", cardColor),
                  const SizedBox(height: 16),
                  _buildOptionCard("Days Active", cardColor),
                  const SizedBox(height: 24),
                  Text(
                    "Towards your goal",
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.9),
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 8),
                  _buildProgressBar(),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 24),
      decoration: const BoxDecoration(
        color: Color(0xFF2D234A),
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(28),
          bottomRight: Radius.circular(28),
        ),
      ),
      child: Column(
        children: const [
          Text(
            "On Beat",
            style: TextStyle(color: Colors.white70, fontSize: 20),
          ),
          SizedBox(height: 8),
          Text(
            "Workout Summary",
            style: TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ).animate().fade(duration: 600.ms).slideY(begin: -0.2, end: 0),
    );
  }

  Widget _buildOptionCard(String title, Color cardColor) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.3)),
      ),
      child: Text(
        title,
        style: const TextStyle(color: Colors.white, fontSize: 17),
      ),
    ).animate().fade(duration: 500.ms).slideX(begin: -0.1);
  }

  Widget _buildProgressBar() {
    return TweenAnimationBuilder(
      tween: Tween<double>(begin: 0, end: progress),
      duration: const Duration(seconds: 2),
      curve: Curves.easeOut,
      builder: (context, value, child) {
        return Container(
          height: 22,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.white.withOpacity(0.4)),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Stack(
            children: [
              FractionallySizedBox(
                widthFactor: value,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    gradient: const LinearGradient(
                      colors: [Color(0xFFB18CFF), Color(0xFF9F6CFF)],
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildBottomNav() {
    return Container(
      height: 70,
      decoration: const BoxDecoration(
        color: Color(0xFF2D234A),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: const [
          Icon(Icons.spa, color: Colors.white, size: 28),
          Icon(Icons.home, color: Colors.white, size: 28),
          Icon(Icons.person, color: Colors.white, size: 28),
        ],
      ),
    );
  }
}
