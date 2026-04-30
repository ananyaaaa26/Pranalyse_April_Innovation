import 'package:flutter/material.dart';
import './widgets/yoga_top_bar.dart';
import './widgets/yoga_card_list.dart';

class YogaHomeScreen extends StatelessWidget {
  const YogaHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          YogaTopBar(),
          SizedBox(height: 20),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              'Choose Your Yoga Activity',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          SizedBox(height: 12),
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: YogaCardList(),
            ),
          ),
          SizedBox(height: 16),
        ],
      ),
    );
  }
}
