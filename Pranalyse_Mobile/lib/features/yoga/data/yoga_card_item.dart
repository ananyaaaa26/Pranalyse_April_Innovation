class YogaCardItem {
  final String title;
  final String description;
  final void Function() onTap;

  YogaCardItem({
    required this.title,
    required this.description,
    required this.onTap,
  });
}
