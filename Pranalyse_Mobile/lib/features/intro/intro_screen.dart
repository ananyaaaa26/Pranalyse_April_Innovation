import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';

class IntroScreen extends StatelessWidget {
  const IntroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16),
          child: Column(
            children: [
              // Animated GIF
              Expanded(
                flex: 4,
                child: Center(
                  child: Image.asset(
                    'assets/images/intro_animation.gif',
                    width: size.width * 0.7,
                    fit: BoxFit.contain,
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Taglines
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // From left
                  Text(
                    "Precision in every pose.",
                    style: GoogleFonts.poppins(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ).animate().slideX(begin: -1, duration: 800.ms).fadeIn(),

                  const SizedBox(height: 8),

                  // From right
                  Text(
                    "Correction in every move.",
                    textAlign: TextAlign.right,
                    style: GoogleFonts.poppins(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ).animate().slideX(begin: 1, duration: 800.ms).fadeIn(),

                  const SizedBox(height: 16),

                  // Centered large text
                  Center(
                    child: Text(
                      "Pranalyse",
                      style: GoogleFonts.poppins(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ).animate().fadeIn(delay: 300.ms),
                  ),
                ],
              ),

              const Spacer(),

              // Get Started Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: const Color(0xFF322F42),
                    side: const BorderSide(
                      color: Color(0xFFB7A2C9),
                      width: 1.5,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  onPressed: () {
                    Navigator.pushNamed(context, '/login'); // Or your route
                  },
                  child: Text(
                    "Get Started",
                    style: GoogleFonts.poppins(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
