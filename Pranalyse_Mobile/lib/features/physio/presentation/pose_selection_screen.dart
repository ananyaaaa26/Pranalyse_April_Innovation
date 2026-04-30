import 'package:flutter/material.dart';
import 'pose_detection_screen.dart';

class PoseSelectionScreen extends StatefulWidget {
  const PoseSelectionScreen({Key? key}) : super(key: key);

  @override
  _PoseSelectionScreenState createState() => _PoseSelectionScreenState();
}

class _PoseSelectionScreenState extends State<PoseSelectionScreen> {
  int selectedIndex = -1;

  final List<String> poses = [
    "Shoulder Abduction",
    "Knee Flexion",
    "Hip Extension",
    "Neck Rotation",
    "Ankle Circles",
    "Standing Balance",
    "Squat",
    "Arm Raises",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff4b3676),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 25),

            // HEADER
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  vertical: 25,
                  horizontal: 20,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white24),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "On Beat",
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 22,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      "Physio Pose Selection",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        shadows: const [
                          Shadow(
                            color: Colors.black45,
                            blurRadius: 6,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "Select a physio pose and continue",
                      style: TextStyle(color: Colors.white70, fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),

            // LIST OF POSES
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                itemCount: poses.length,
                itemBuilder: (context, index) {
                  bool isSelected = selectedIndex == index;

                  return InkWell(
                    onTap: () {
                      setState(() {
                        selectedIndex = index; // Update selected index
                      });
                    },
                    borderRadius: BorderRadius.circular(20),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 250),
                      curve: Curves.easeOut,
                      margin: const EdgeInsets.symmetric(vertical: 12),
                      padding: const EdgeInsets.symmetric(
                        vertical: 22,
                        horizontal: 20,
                      ),
                      decoration: BoxDecoration(
                        color:
                            isSelected
                                ? Colors.white.withOpacity(0.18)
                                : const Color(0xff1f1f2e),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color:
                              isSelected
                                  ? Colors.white.withOpacity(0.6)
                                  : Colors.white24,
                          width: isSelected ? 2.3 : 1.2,
                        ),
                        boxShadow:
                            isSelected
                                ? [
                                  const BoxShadow(
                                    color: Colors.white24,
                                    blurRadius: 10,
                                    offset: Offset(0, 4),
                                  ),
                                ]
                                : [],
                      ),
                      child: Text(
                        poses[index],
                        style: const TextStyle(
                          fontSize: 18,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 10),

            // CONTINUE BUTTON
            Padding(
              padding: const EdgeInsets.only(bottom: 30, right: 25),
              child: Align(
                alignment: Alignment.centerRight,
                child: ElevatedButton(
                  onPressed:
                      selectedIndex != -1
                          ? () {
                            // Navigate to next screen when a pose is selected
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PoseDetectionScreen(),
                              ),
                            );
                          }
                          : null, // Disabled if nothing selected
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        selectedIndex != -1
                            ? const Color(0xffd5c2e0)
                            : Colors.white24,
                    foregroundColor: Colors.black,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 40,
                      vertical: 16,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18),
                    ),
                  ),
                  child: const Text("Continue", style: TextStyle(fontSize: 17)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
