import 'package:flutter/material.dart';
import 'widgets/pysio_top_bar.dart';
import 'widgets/pysio_card_list.dart';

class PhysioHomeScreen extends StatelessWidget {
  const PhysioHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          PysioTopBar(),
          SizedBox(height: 20),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              'Choose Your Physio Activity',
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
              child: PysioCardList(),
            ),
          ),
          SizedBox(height: 16),
        ],
      ),
    );
  }
}
