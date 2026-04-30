import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class MonthlyGraphWidget extends StatelessWidget {
  const MonthlyGraphWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        minY: 0,
        maxY: 50,
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
              interval: 10,
            ),
          ),
        ),
        gridData: FlGridData(show: true),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: List.generate(
              12,
              (i) => FlSpot(i.toDouble(), (i * 3 + 10).toDouble()),
            ),
            isCurved: true,
            color: Colors.orangeAccent,
            barWidth: 3,
            dotData: FlDotData(show: true),
          ),
        ],
      ),
    );
  }

  Widget bottomTitle(double value, TitleMeta meta) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (value.toInt() >= 0 && value.toInt() < months.length) {
      return Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Text(
          months[value.toInt()],
          style: const TextStyle(color: Colors.white70, fontSize: 10),
        ),
      );
    }
    return const SizedBox.shrink();
  }
}
