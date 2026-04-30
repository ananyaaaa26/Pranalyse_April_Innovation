import 'package:flutter/material.dart';

class PoseSelectionScreen extends StatefulWidget {
  @override
  _PoseSelectionScreen createState() => _PoseSelectionScreen();
}

class _PoseSelectionScreen extends State<PoseSelectionScreen>
    with SingleTickerProviderStateMixin {
  int selectedIndex = -1;

  final List<String> poses = [
    "Mountain Pose",
    "Tree Pose",
    "Warrior II",
    "Downward Dog",
    "Triangle Pose",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff4b3676), // purple background
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 25),

            /// 🔶 HEADER CARD
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
                  border: Border.all(color: Colors.white24, width: 1),
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
                      "Yoga Pose Selection",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        shadows: [
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
                      "Select a yoga pose and continue",
                      style: TextStyle(color: Colors.white70, fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),

            /// 🔶 Pose List
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                itemCount: poses.length,
                itemBuilder: (context, index) {
                  bool isSelected = selectedIndex == index;

                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        selectedIndex = index;
                      });
                    },
                    child: AnimatedContainer(
                      duration: Duration(milliseconds: 250),
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
                                : Color(0xff1f1f2e),
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
                                  BoxShadow(
                                    color: Colors.white24,
                                    blurRadius: 10,
                                    offset: Offset(0, 4),
                                  ),
                                ]
                                : [],
                      ),
                      child: Text(
                        poses[index],
                        style: TextStyle(fontSize: 18, color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 10),

            /// 🔶 Continue Button
            Padding(
              padding: const EdgeInsets.only(bottom: 30, right: 25),
              child: Align(
                alignment: Alignment.centerRight,
                child: ElevatedButton(
                  onPressed: selectedIndex == -1 ? null : () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        selectedIndex == -1
                            ? Colors.white24
                            : Color(0xffd5c2e0),
                    foregroundColor: Colors.black,
                    padding: EdgeInsets.symmetric(horizontal: 40, vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18),
                    ),
                  ),
                  child: Text("Continue", style: TextStyle(fontSize: 17)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
