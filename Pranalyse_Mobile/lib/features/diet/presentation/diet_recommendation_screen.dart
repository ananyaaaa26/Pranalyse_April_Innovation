import 'package:flutter/material.dart';
import 'package:on_beat/features/diet/data/diet_info_options.dart';
import './widgets/diet_top_bar.dart'; // adjust path if needed
import './widgets/gradient_card.dart'; // assuming GradientCard is a widget
import './details_screen.dart'; // assuming you have this screen in presentation/screens/

class DietRecommendationScreen extends StatelessWidget {
  
  const DietRecommendationScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const DietTopBar(),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
            child: Text(
              'Select an option to know more',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: dietInfoOptions.length,
              itemBuilder: (context, index) {
                return GradientCard(
                  title: dietInfoOptions[index],
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (_) => DetailScreen(title: dietInfoOptions[index]),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
