import 'package:flutter/material.dart';
import '../data/diet_data.dart';

class DetailScreen extends StatelessWidget {
  final String title;

  const DetailScreen({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final String details = dietDetails[title] ?? "No information available.";

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        backgroundColor: const Color(0xFF1E1B2E),
        foregroundColor: Colors.white, // <-- FIX (makes title & icons white)
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Text(
            details,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              height: 1.5,
            ),
          ),
        ),
      ),
      backgroundColor: const Color(0xFF1E1B2E),
    );
  }
}
