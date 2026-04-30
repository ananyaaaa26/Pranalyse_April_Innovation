import 'package:flutter/material.dart';
import './detailsText.dart';
import './actionButton.dart';

class DetailsList extends StatelessWidget {
  const DetailsList({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 20),
      child: ListView(
        children: const [
          DetailText(label: 'Gender - Female'),
          DetailText(label: 'Age - 21'),
          DetailText(label: 'Weight - 54'),
          DetailText(label: 'Height - 165'),
          DetailText(label: 'Streak Count - 7'),
          DetailText(label: 'Total Days Active - 30'),
          SizedBox(height: 30),

          ActionButton(text: 'Update Physical Details'),
          SizedBox(height: 20),
          ActionButton(text: 'Fitness Logs'),
          SizedBox(height: 20),
          ActionButton(text: 'Define Goals'),
          SizedBox(height: 20),
          ActionButton(text: 'Download Full Report'),
        ],
      ),
    );
  }
}
