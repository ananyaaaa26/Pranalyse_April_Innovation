import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import './widgets/top_bar.dart';
import './widgets/greeting_text.dart';
import './widgets/graph_section.dart';
import './widgets/workout_goals_section.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              TopBar(),
              SizedBox(height: 20),
              GreetingText(name: 'Name'),
              SizedBox(height: 20),
              GraphSection(),
              SizedBox(height: 24),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Workout Goals for Today',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 12),
              WorkoutGoalsSection(),
              SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
