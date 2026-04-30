import 'package:flutter/material.dart';
import './widgets/detailsList.dart';
import './widgets/topBar.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF584583),
      body: Column(children: const [Topbar(), Expanded(child: DetailsList())]),
    );
  }
}
