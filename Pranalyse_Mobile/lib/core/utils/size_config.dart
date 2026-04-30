import 'package:flutter/material.dart';

class SizeConfig {
  static late double screenWidth;
  static late double screenHeight;
  static late double blockWidth;
  static late double blockHeight;

  static void init(BuildContext context) {
    final size = MediaQuery.of(context).size;
    screenWidth = size.width;
    screenHeight = size.height;
    blockWidth = screenWidth / 100;
    blockHeight = screenHeight / 100;
  }

  static bool isMobile() => screenWidth < 600;
  static bool isTablet() => screenWidth >= 600 && screenWidth < 1024;
  static bool isDesktop() => screenWidth >= 1024;
}
