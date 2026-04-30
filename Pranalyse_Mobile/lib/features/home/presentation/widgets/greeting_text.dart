import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class GreetingText extends StatelessWidget {
  final String name;

  const GreetingText({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        'Hello, Ananya!!!',
        style: GoogleFonts.poppins(
          color: Colors.white,
          fontSize: 22,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
