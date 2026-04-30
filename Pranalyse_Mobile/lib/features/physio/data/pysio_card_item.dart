class PysioCardItem {
  final String title;
  final String description;
  final void Function() onTap;

  PysioCardItem({
    required this.title,
    required this.description,
    required this.onTap,
  });
}
