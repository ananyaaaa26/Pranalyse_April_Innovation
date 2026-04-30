import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class WorkoutGoalsSection extends StatelessWidget {
  const WorkoutGoalsSection({super.key});

  // Generic data for right-side cards
  final List<Map<String, String>> metrics = const [
    {'title': 'Steps', 'value': '5,000'},
    {'title': 'Workout Duration', 'value': '45 min'},
    {'title': 'Active Minutes', 'value': '30 min'},
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          // Left main card (Calories, Avatar, etc.)
          Expanded(
            flex: 2,
            child: Container(
              margin: const EdgeInsets.only(right: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF4B3A70), Color(0xFFB7A2C9)],
                ),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    blurRadius: 6,
                    offset: const Offset(2, 4),
                  ),
                ],
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircleAvatar(
                    radius: 30,
                    backgroundImage: AssetImage('assets/images/avatar.png'),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Calories Burned',
                    style: GoogleFonts.poppins(color: Colors.white),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '320 kcal',
                    style: GoogleFonts.poppins(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Right-side stacked cards (dynamic)
          Expanded(
            flex: 3,
            child: Column(
              children:
                  metrics
                      .map(
                        (metric) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: MetricCard(
                            title: metric['title']!,
                            value: metric['value']!,
                          ),
                        ),
                      )
                      .toList(),
            ),
          ),
        ],
      ),
    );
  }
}

class MetricCard extends StatelessWidget {
  final String title;
  final String value;

  const MetricCard({super.key, required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.centerRight,
          end: Alignment.centerLeft,
          colors: [Color(0xFF322F42), Color(0xFFB7A2C9)],
        ),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 6,
            offset: const Offset(2, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: GoogleFonts.poppins(color: Colors.white, fontSize: 16),
          ),
          Text(
            value,
            style: GoogleFonts.poppins(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }
}
