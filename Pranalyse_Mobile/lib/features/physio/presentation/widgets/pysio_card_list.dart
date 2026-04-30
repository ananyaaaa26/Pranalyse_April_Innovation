import 'package:flutter/material.dart';
import '../pose_selection_screen.dart';
import '../pose_detection_screen.dart';
import '../../data/pysio_card_item.dart';
import 'pysio_card.dart';
import '../../presentation/physiotherapist.dart';

class PysioCardList extends StatelessWidget {
  const PysioCardList({super.key});

  @override
  Widget build(BuildContext context) {
    final List<PysioCardItem> cardItems = [
      PysioCardItem(
        title: "Exercise Selection",
        description:
            "Watches your movements in real time and automatically detects the pose you're doing — turning every move into measurable progress.",
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => PoseSelectionScreen()),
          );
        },
      ),
      PysioCardItem(
        title: "Physiotherapist",
        description:
            "Pick what suits you! Choose one exercise to get started quickly, or select several to create your own full workout. You’re in control of your routine.",
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => PhysioChatScreen()),
          );
        },
      ),
    ];

    return Column(
      children:
          cardItems
              .map(
                (item) => PysioCard(
                  title: item.title,
                  description: item.description,
                  onTap: item.onTap,
                ),
              )
              .toList(),
    );
  }
}
