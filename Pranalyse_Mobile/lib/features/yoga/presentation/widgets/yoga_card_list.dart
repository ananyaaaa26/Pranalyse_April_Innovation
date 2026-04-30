import 'package:flutter/material.dart';
import '../pose_selection_screen.dart';
import '../pose_detection_screen.dart';
import '../../data/yoga_card_item.dart';
import 'yoga_card.dart';

class YogaCardList extends StatelessWidget {
  const YogaCardList({super.key});

  @override
  Widget build(BuildContext context) {
    final List<YogaCardItem> cardItems = [
      YogaCardItem(
        title: "Yoga Pose Selection",
        description:
            "Pick what suits you! Choose one exercise to get started quickly, or select several to create your own full workout. You’re in control of your routine.",
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => PoseSelectionScreen()),
          );
        },
      ),
      YogaCardItem(
        title: "Auto Detect Pose",
        description:
            "Watches your movements in real time and automatically detects the pose you're doing — turning every move into measurable progress.",
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => PoseDetectionScreen()),
          );
        },
      ),
    ];

    return Column(
      children:
          cardItems
              .map(
                (item) => YogaCard(
                  title: item.title,
                  description: item.description,
                  onTap: item.onTap,
                ),
              )
              .toList(),
    );
  }
}
