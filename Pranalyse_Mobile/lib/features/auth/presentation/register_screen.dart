import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF4B3A70),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 12),

            Text(
              'Create Profile',
              style: GoogleFonts.poppins(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 8),
            Text(
              'Help us understand you better!!',
              style: GoogleFonts.poppins(
                color: Colors.white70,
                fontSize: 14,
              ),
            ),

            const SizedBox(height: 32),

            _sectionTitle("Basic Details"),
            _inputField("Full Name", Icons.person),
            _inputField("Username", Icons.alternate_email),
            _inputField("Password", Icons.lock, obscure: true),

            _sectionTitle("Basic Profile"),
            _dropdownField(
              hint: "Gender",
              icon: Icons.wc,
              items: ["Male", "Female"],
            ),
            _inputField("Age (years)", Icons.cake),
            _inputField("Height (cm / ft-in)", Icons.height),
            _inputField("Weight (kg / lbs)", Icons.monitor_weight),

            _sectionTitle("Lifestyle"),
            _dropdownField(
              hint: "Activity Level",
              icon: Icons.directions_run,
              items: [
                "Sedentary",
                "Lightly active",
                "Moderately active",
                "Very active",
              ],
            ),
            _dropdownField(
              hint: "Sleep Duration",
              icon: Icons.bedtime,
              items: [
                "<5 hours",
                "5–6 hours",
                "6–7 hours",
                "7–8 hours",
                "8+ hours",
              ],
            ),
            _dropdownField(
              hint: "Stress Level",
              icon: Icons.self_improvement,
              items: ["Low", "Moderate", "High"],
            ),

            _sectionTitle("Food Preferences"),
            _dropdownField(
              hint: "Diet Type",
              icon: Icons.restaurant,
              items: [
                "Vegetarian",
                "Eggetarian",
                "Non-vegetarian",
                "Vegan",
              ],
            ),
            _dropdownField(
              hint: "Meals per Day",
              icon: Icons.schedule,
              items: ["2", "3", "4+", "Irregular"],
            ),
            _dropdownField(
              hint: "Water Intake",
              icon: Icons.water_drop,
              items: ["<1 L", "1–2 L", "2–3 L", "3+ L"],
            ),

            _sectionTitle("Fitness & Goals"),
            _dropdownField(
              hint: "Exercise Experience",
              icon: Icons.fitness_center,
              items: ["Beginner", "Intermediate", "Advanced"],
            ),
            _dropdownField(
              hint: "Primary Goal",
              icon: Icons.flag,
              items: [
                "Weight loss",
                "Weight gain",
                "Muscle toning",
                "Pain relief",
                "Flexibility",
                "Overall fitness",
              ],
            ),
            _dropdownField(
              hint: "Time Available",
              icon: Icons.timer,
              items: ["10–15 mins", "20–30 mins", "45–60 mins"],
            ),

            const SizedBox(height: 32),

            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFB7A2C9),
                  foregroundColor: const Color(0xFF4B3A70),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () {
                  // Submit signup
                },
                child: const Text(
                  "Get Started",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _sectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12, top: 24),
      child: Text(
        title,
        style: GoogleFonts.poppins(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _inputField(
    String hint,
    IconData icon, {
    bool obscure = false,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextField(
        obscureText: obscure,
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.white12,
          prefixIcon: Icon(icon, color: Color(0xFFB7A2C9)),
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.white60),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    );
  }

  Widget _dropdownField({
    required String hint,
    required IconData icon,
    required List<String> items,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: DropdownButtonFormField<String>(
        dropdownColor: const Color(0xFF4B3A70),
        iconEnabledColor: const Color(0xFFB7A2C9),
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.white12,
          prefixIcon: Icon(icon, color: Color(0xFFB7A2C9)),
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.white60),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: BorderSide.none,
          ),
        ),
        items: items
            .map(
              (e) => DropdownMenuItem(
                value: e,
                child: Text(e),
              ),
            )
            .toList(),
        onChanged: (value) {},
      ),
    );
  }
}
