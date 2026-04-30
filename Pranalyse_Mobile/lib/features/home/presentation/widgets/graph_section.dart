import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'daily_graph.dart';
import 'weekly_graph.dart';
import 'monthly_graph.dart';

class GraphSection extends StatefulWidget {
  const GraphSection({super.key});

  @override
  State<GraphSection> createState() => _GraphSectionState();
}

class _GraphSectionState extends State<GraphSection> {
  String selectedFilter = 'Daily'; // default selected
  final filters = ['Daily', 'Weekly', 'Monthly'];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: const Color(0xFF212531),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ---------------- FILTER TABS ----------------
            Row(
              children:
                  filters.map((label) {
                    final bool isSelected = selectedFilter == label;

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedFilter = label;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 8),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.white : Colors.transparent,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.white),
                        ),
                        child: Text(
                          label,
                          style: GoogleFonts.poppins(
                            fontSize: 12,
                            color: isSelected ? Colors.black : Colors.white,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
            ),

            const SizedBox(height: 12),

            // ---------------- SELECTED GRAPH DISPLAY ----------------
            SizedBox(height: 140, child: Center(child: _buildSelectedGraph())),
          ],
        ),
      ),
    );
  }

  Widget _buildSelectedGraph() {
    if (selectedFilter == 'Daily') {
      return const DailyGraphWidget();
    } else if (selectedFilter == 'Weekly') {
      return const WeeklyGraphWidget();
    } else {
      return const MonthlyGraphWidget();
    }
  }
}
