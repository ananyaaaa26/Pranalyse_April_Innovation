import 'package:flutter/material.dart';

class YogaTopBar extends StatelessWidget {
  const YogaTopBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 97,
      decoration: const BoxDecoration(
        color: Color(0xFF322F42),
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(20),
          bottomRight: Radius.circular(20),
        ),
      ),
      child: const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Pranalyse',
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
            SizedBox(height: 4),
            Text(
              'Yoga',
              style: TextStyle(
                color: Colors.white,
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
