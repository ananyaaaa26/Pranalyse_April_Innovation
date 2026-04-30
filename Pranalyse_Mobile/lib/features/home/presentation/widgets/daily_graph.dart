import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class DailyGraphWidget extends StatelessWidget {
  const DailyGraphWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        minY: 0,
        maxY: 10,
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
              interval: 2,
            ),
          ),
        ),
        gridData: FlGridData(show: true),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: const [
              FlSpot(0, 3),
              FlSpot(1, 5),
              FlSpot(2, 2),
              FlSpot(3, 7),
              FlSpot(4, 4),
              FlSpot(5, 6),
              FlSpot(6, 5),
            ],
            isCurved: true,
            color: Colors.cyanAccent,
            barWidth: 3,
            dotData: FlDotData(show: true),
          ),
        ],
      ),
    );
  }

  Widget bottomTitle(double value, TitleMeta meta) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (value.toInt() >= 0 && value.toInt() < days.length) {
      return Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Text(
          days[value.toInt()],
          style: const TextStyle(color: Colors.white70, fontSize: 10),
        ),
      );
    }
    return const SizedBox.shrink();
  }
}
