import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class WeeklyGraphWidget extends StatelessWidget {
  const WeeklyGraphWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        maxY: 15,
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: bottomTitle,
              reservedSize: 28,
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 30,
              interval: 3,
            ),
          ),
        ),
        gridData: FlGridData(show: true),
        borderData: FlBorderData(show: false),
        barGroups: [
          BarChartGroupData(
            x: 0,
            barRods: [BarChartRodData(toY: 5, color: Colors.greenAccent)],
          ),
          BarChartGroupData(
            x: 1,
            barRods: [BarChartRodData(toY: 8, color: Colors.greenAccent)],
          ),
          BarChartGroupData(
            x: 2,
            barRods: [BarChartRodData(toY: 6, color: Colors.greenAccent)],
          ),
          BarChartGroupData(
            x: 3,
            barRods: [BarChartRodData(toY: 10, color: Colors.greenAccent)],
          ),
          BarChartGroupData(
            x: 4,
            barRods: [BarChartRodData(toY: 7, color: Colors.greenAccent)],
          ),
        ],
      ),
    );
  }

  Widget bottomTitle(double value, TitleMeta meta) {
    const weeks = ['W1', 'W2', 'W3', 'W4', 'W5'];
    if (value.toInt() >= 0 && value.toInt() < weeks.length) {
      return Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Text(
          weeks[value.toInt()],
          style: const TextStyle(color: Colors.white70, fontSize: 10),
        ),
      );
    }
    return const SizedBox.shrink();
  }
}
